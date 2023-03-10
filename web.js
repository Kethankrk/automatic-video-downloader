const puppeteer = require("puppeteer");
const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors());
app.use(express.json());



app.post("/download", async (req, res)=> {

    console.log(req.body.url)

    const lal = await scrap(req.body.url)
    return res.send(lal)
})


const scrap = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.y2mate.com/");
  await page.click("#txt-url", { clickCount: 1 });
  await page.type("#txt-url", url);
  await page.click("#btn-submit");
  await page.waitForXPath('/html/body/div[1]/div/div/div/div[1]/div/div/div/div[4]/div[1]/div[2]/ul/li[1]/a')
  const downloadBtn = await page.waitForXPath(
    "/html/body/div[1]/div/div/div/div[1]/div/div/div/div[4]/div[1]/div[2]/div/div[1]/table/tbody/tr[1]/td[3]/button"
  );
  await downloadBtn.click();
  await page.waitForXPath('/html/body/div[1]/div/div/div/div[1]/div/div/div/div[3]/div[2]/div/div[2]/div[2]/div/a')
  const downloadLink = await page.$eval('html body#bootstrap-themes.swag-line.modal-open div.container-overflow-wrap div div div.container div.panel.panel-default.m-b-0 div.panel-body div.div-form div.hero.hero-homepage div#progressModal.modal.fade.in div.modal-dialog div.modal-content div.modal-body.text-center div#process-result div.form-group.has-success.has-feedback a.btn.btn-success.btn-file', ele => ele.getAttribute('href'))
  console.log(downloadLink)
  await browser.close();
  return downloadLink
};

app.listen(5000);


