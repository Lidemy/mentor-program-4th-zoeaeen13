// 輸入國家英文名，能夠查詢符合的國家資訊
const request = require('request');

const process = require('process');

const bookUrl = 'https://restcountries.eu/rest/v2/name';
const searchName = process.argv[2];

// 找國家
function searchCountries(name) {
  request(
    `${bookUrl}/${name}`,
    (error, response, body) => {
      if (response.statusCode === 404) {
        console.log('找不到國家資訊');
        return;
      }

      const countryInfo = JSON.parse(body);
      const times = countryInfo.length;
      for (let i = 0; i < times; i += 1) {
        console.log('============');
        console.log(`國家：${countryInfo[i].name}`);
        console.log(`首都：${countryInfo[i].capital}`);
        console.log(`貨幣：${countryInfo[i].currencies[0].code}`);
        console.log(`國碼：${countryInfo[i].callingCodes[0]}`);
      }
    },
  );
}

searchCountries(searchName);
