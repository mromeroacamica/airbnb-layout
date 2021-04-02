export const configFile = new Promise<any>((resolve, reject) => {
  const xmlhttp = new XMLHttpRequest();
  const url = '/assets/config/config.json';
  xmlhttp.open('GET', url, true);
  xmlhttp.onload = () => {
    if (xmlhttp.status === 200) {
      resolve(JSON.parse(xmlhttp.responseText));
    } else {
      resolve({});
    }
  };
  xmlhttp.send();
});
