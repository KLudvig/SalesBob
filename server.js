const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose')
const Bob = require('./models/Bob');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//*** Connect to Database ***
const url = process.env.MONGO_DB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//Check if database is connected
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})
db.on('error', err => {
  console.error('connection error:', err)
})

//this rote is not for any use, can be deleted:
app.get('/api/scraper', (req, res) => {
  res.json({ key: "value" });
});


//*** ROUTES ***

//Load settings
app.post('/api/loadSettings', (req, res) => {
  async function run() {
    const theCompany = 'testCompany'
    const settings = await Bob.findOne({
      company: theCompany
    })
    res.json({ settings });
  }
  run();
});

//Save settings
app.post('/api/saveSettings', (req, res) => {
  console.log(req.body.location)

  const findAndUpdate = Bob.findOneAndUpdate({ company: 'testCompany' }, {
    bobAutoCollect: req.body.bobAutoCollect,
    bobAutoEmails: req.body.bobAutoEmails,
    location: req.body.location,
    jobType: req.body.jobType,
    fromEmail: req.body.fromEmail,
    emailContent: req.body.emailContent,
    excludedCompanies: req.body.excludedCompanies,
  }, { useFindAndModify: false })
  async function run() {
    await findAndUpdate
    res.send('Settings saved');
  }
  run();
});


//The scraper code
app.post('/api/scraper', (req, res) => {
  console.log('Bob has started to scrape')

  const scrapeIt = async () => {
    //1. First, get the settings
    const theCompany = 'testCompany'
    const settings = await Bob.findOne({
      company: theCompany
    })

    //2. Adjust settings to make use of platsbanken search
    let searchWord = ''; //Used to specify search in selected category
    let job = settings.jobType //Used to select category
    let location = settings.location
    let excludedCompanies = settings.excludedCompanies

    // Adjust location
    if (location === 'Västra Götalands län') { location = 'l=2:zdoY_6u5_Krt' }
    if (location === 'Göteborg') { location = 'l=3:PVZL_BQT_XtL' }
    if (location === 'Stockholms län') { location = 'l=2:CifL_Rzy_Mku' }
    if (location === 'Stockholm') { location = 'l=3:AvNB_uwa_6n6' }
    if (location === 'Skåne län') { location = 'l=2:CaRE_1nn_cSU' }
    if (location === 'Malmö') { location = 'l=3:oYPt_yRA_Smm' }

    if (location === 'Blekinge län') { location = 'l=2:DQZd_uYs_oKb' }
    if (location === 'Dalarnas län') { location = 'l=2:oDpK_oZ2_WYt' }
    if (location === 'Gotlands län') { location = 'l=2:K8iD_VQv_2BA' }
    if (location === 'Gävleborgs län') { location = 'l=2:zupA_8Nt_xcD' }
    if (location === 'Hallands län') { location = 'l=2:wjee_qH2_yb6' }
    if (location === 'Jämtlands län') { location = 'l=2:65Ms_7r1_RTG' }
    if (location === 'Jönköpings län') { location = 'l=2:MtbE_xWT_eMi' }
    if (location === 'Kalmar län') { location = 'l=2:9QUH_2bb_6Np' }
    if (location === 'Kronobergs län') { location = 'l=2:tF3y_MF9_h5G' }
    if (location === 'Norrbottens län') { location = 'l=2:9hXe_F4g_eTG' }
    if (location === 'Södermanlands län') { location = 'l=2:s93u_BEb_sx2' }
    if (location === 'Uppsala län') { location = 'l=2:zBon_eET_fFU' }
    if (location === 'Värmlands län') { location = 'l=2:EVVp_h6U_GSZ' }
    if (location === 'Västerbottens län') { location = 'l=2:g5Tt_CAV_zBd' }
    if (location === 'Västernorrlands län') { location = 'l=2:NvUF_SP1_1zo' }
    if (location === 'Västmanlands län') { location = 'l=2:G6DV_fKE_Viz' }
    if (location === 'Örebro län') { location = 'l=2:xTCk_nT5_Zjm' }
    if (location === 'Östergötlands län') { location = 'l=2:oLT3_Q9p_3nn' }

    // Adjust jobType
    if (job === 'IT - only programming') {
      job = 'p=5:DJh5_yyF_hEM;5:Q5DF_juj_8do';
      searchWord = '&q=(frontend%20AND%20backend)'; //combines jobtype with word search
    }
    if (job === 'IT') {
      job = 'p=4:apaJ_2ja_LuF';
      searchWord = '';
    }
    if (job === 'Economy') {
      job = 'p=5:Uw4n_UB2_RCW;5:ij8k_EwC_zyB;5:pTr9_RBT_9ur;5:q81z_3oD_1qu;5:cRmd_536_pT1;5:Y6yY_SuR_hVh';
      searchWord = '';
    }
    if (job === 'HR') { //includes salary positions
      job = 'p=5:L7eh_ihX_vM5;5:bjqk_F3A_5Hk';
      searchWord = '';
    }
    if (job === 'Industry') {
      job = 'p=4:wTEr_CBC_bqh';
      searchWord = '';
    }
    if (job === 'Leaders') { //short version is only VD and high positions
      job = 'p=5:3i4a_Ufc_qpp';
      searchWord = '';
    }
    if (job === 'Marketing') {
      job = 'p=5:p16X_44f_rwZ;5:WX67_Pfb_WMN;5:83wV_GJa_vMd';
      searchWord = '&q=marknad';
    }
    if (job === 'Office work') { //economy assistants included, sales is excluded.
      job = 'p=5:MGk3_LvL_AU2;5:vCAb_uuo_ek5;5:ij8k_EwC_zyB;5:9dLz_BCK_oDA;5:H2Zj_eL9_x28;5:k1Nx_auG_sNh;5:ByrL_ANp_UwV;5:vPP6_rsw_dck;5:4aPu_2nd_8X6;5:oEmP_NC1_sXE;5:eQ4M_CNm_ozj';
      searchWord = '';
    }
    if (job === 'Sales') { // Very wide range from entry level (ex phone and field sales) to top positions
      job = 'p=5:48KE_fDE_ryL;5:NCeZ_rSk_B4D;5:oXSW_fbY_XrY;5:fdLf_oPp_wVw;5:PxXc_16t_oZo;5:xyW2_toA_Skh';
      searchWord = '';
    }

    const platsbanken = (location, searchWord, job) => `https://arbetsformedlingen.se/platsbanken/annonser?${job}${searchWord}&${location}`;

    //3. Start scraping, first scrape links, then use scraped links to scrape each job ad.
    // Initiate the Puppeteer browser
    const browser = await puppeteer.launch(); 
    const page = await browser.newPage();
    // Configure the navigation timeout (0 is no timeout, this should fix error: "TimeoutError: Navigation timeout of 30000 ms exceeded")
    await page.setDefaultNavigationTimeout(0);
    // Go to the page and wait for it to load 
    await page.goto(platsbanken(location, searchWord, job), { waitUntil: 'networkidle0' });
    // Run javascript inside of the page 
    let jobLinks = await page.evaluate(() => {
      let links = [];

      const link = document.querySelectorAll('.header-container > h3 > a');
      for (let i = 0; i < link.length; i++) {
        links.push(link[i].href);
      }

      // Returning an object filled with the scraped data
      return { links }
    });

    console.log(jobLinks);
    scrapeJobInfo(jobLinks, excludedCompanies);
  };

  // Scrape job ads from links 
  const scrapeJobInfo = async (links, excludedCompanies) => {
    // Initiate the Puppeteer browser 
    const browser = await puppeteer.launch(); 
    const page = await browser.newPage();

    // Empty array for pushing the data
    const jobData = [];

    for (let i = 0; i < links.links.length; i++) {
      let linkUrl = `${links.links[i]}`
      await page.goto(linkUrl, { waitUntil: 'networkidle0' });
      let companyInfo = await page.evaluate(() => {
        let url = location.href;
        let jobTitle = document.querySelector('h1').innerText;
        let companyName = document.getElementById('pb-company-name').innerText;
        let jobType = document.getElementById('pb-job-role').innerText;
        let jobLocation = document.getElementById('pb-job-location').innerText.replace('Kommun:', '');
        let email = document.querySelector("[href*=mailto]").innerText
        let contactFirstName = ""
        if (email.length < 5) {
          email = "No email";
          contactFirstName = "No name";
        } else {
          contactFirstName = email.split("@")[0].replace(/\./g, ' ').split(" ")[0]; //for use when contact
        }
        if (
          email.includes('women') || email.includes('Women') ||
          email.includes('jobb') || email.includes('Jobb') ||
          email.includes('info') || email.includes('Info') ||
          email.includes('rekrytering') || email.includes('Rekrytering') ||
          email.includes('kontakt') || email.includes('kontakt')) { contactFirstName = "No name" }

        return {
          url,
          jobTitle,
          companyName,
          jobType,
          jobLocation,
          email,
          contactFirstName
        }
      });
      jobData.push(companyInfo)
    };

    // Close browser and log jobData //
    await browser.close();
    console.log('Data collected!')
    const time = new Date().toLocaleString();

    //Remove excluded companies
    const filteredJobData = jobData.filter(item => !excludedCompanies.includes(item.companyName)); //Note: It is now case sensitive
    const jobsWithMail = filteredJobData.filter(item => !item.contactFirstName.includes('No name')); // Note: only personal email adresses is used with this.

    const uniqueCompaniesJobData = jobsWithMail.filter((value, index, self) => self.map(item => item.companyName).indexOf(value.companyName) == index) //Filter so only one job per company
    console.log('unique jobs:')
    console.log(uniqueCompaniesJobData)
    //Send finished result to client
    res.send([uniqueCompaniesJobData, time])
  };

  scrapeIt();
});

app.listen(port, () => console.log(`Listening on port ${port}`));