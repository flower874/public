var namelist = JSON.parse(http.get('http://106.12.191.1/public/cycle.json').body.string());
log(namelist['快手极速版'])
