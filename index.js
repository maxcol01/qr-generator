import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

const questions = [
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL: '
    },
    {
        type: 'input',
        name: 'site',
        message: 'Enter a shortcut name: '
      },
  ];

inquirer
  .prompt(questions)
  .then((answers) => {
    const url = answers.url;
    const shortcut = answers.site;
    console.log(shortcut)
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(`${shortcut}.png`));
    fs.appendFile('websiteList.txt', `${shortcut}: ${url}\n`, (err) => {
      if (err) throw err;
      console.log(`Saved ${url} to ${shortcut}.txt`);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Couldn't be rendered in the current environment");
    } else {
      console.log("Something went wrong");
    }
  });