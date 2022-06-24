var redirectable = {
    init: function (location = 'ru') {
        this.location = location;
        this.check_redirect();
    },

    location: "ru",
    redirect_data: {
        link_ru: "/",
        link_en: "/en",
        geo_ru: [
            "BY", "KZ", "KG", "KGZ", "RU", "TJ"
        ],
        geo_en: [
            "AU",
            "AT",
            "AZ",
            "AX",
            "AL",
            "DZ",
            "AS",
            "AI",
            "AO",
            "AD",
            "AQ",
            "AG",
            "AR",
            "AM",
            "AW",
            "AF",
            "BS",
            "BD",
            "BB",
            "BH",
            "BZ",
            "BE",
            "BJ",
            "BM",
            "BG",
            "BO",
            "BQ",
            "BA",
            "BW",
            "BR",
            "IO",
            "VG",
            "BN",
            "BF",
            "BI",
            "BT",
            "VU",
            "VA",
            "GB",
            "HU",
            "VE",
            "VI",
            "UM",
            "TL",
            "VN",
            "GA",
            "HT",
            "GY",
            "GM",
            "GH",
            "GP",
            "GT",
            "GN",
            "GW",
            "DE",
            "GG",
            "GI",
            "HN",
            "HK",
            "GD",
            "GL",
            "GR",
            "GE",
            "GU",
            "DK",
            "CD",
            "JE",
            "DJ",
            "DM",
            "DO",
            "EG",
            "ZM",
            "ZW",
            "IL",
            "IN",
            "ID",
            "JO",
            "IQ",
            "IR",
            "IE",
            "IS",
            "ES",
            "IT",
            "YE",
            "CV",
            "KY",
            "KH",
            "CM",
            "CA",
            "QA",
            "KE",
            "CY",
            "KI",
            "CN",
            "CC",
            "CO",
            "KM",
            "CG",
            "XK",
            "CR",
            "CI",
            "CU",
            "KW",
            "CW",
            "LA",
            "LV",
            "LS",
            "LR",
            "LB",
            "LY",
            "LT",
            "LI",
            "LU",
            "MU",
            "MR",
            "MG",
            "YT",
            "MO",
            "MK",
            "MW",
            "MY",
            "ML",
            "MV",
            "MT",
            "MA",
            "MQ",
            "MH",
            "MX",
            "FM",
            "MZ",
            "MD",
            "MC",
            "MN",
            "MS",
            "MM",
            "NA",
            "NR",
            "NP",
            "NE",
            "NG",
            "NL",
            "NI",
            "NU",
            "NZ",
            "NC",
            "NO",
            "NF",
            "AE",
            "OM",
            "IM",
            "CX",
            "SH",
            "CK",
            "PK",
            "PW",
            "PS",
            "PA",
            "PG",
            "PY",
            "PE",
            "PN",
            "PL",
            "PT",
            "PR",
            "RE",
            "RW",
            "RO",
            "US",
            "SV",
            "WS",
            "SM",
            "ST",
            "SA",
            "SZ",
            "SJ",
            "LC",
            "KP",
            "MP",
            "SC",
            "BL",
            "MF",
            "PM",
            "SN",
            "VC",
            "KN",
            "RS",
            "SG",
            "SX",
            "SY",
            "SK",
            "SI",
            "SB",
            "SO",
            "SD",
            "SR",
            "SL",
            "TH",
            "TW",
            "TZ",
            "TG",
            "TK",
            "TO",
            "TT",
            "TV",
            "TN",
            "TM",
            "TC",
            "TR",
            "UG",
            "UZ",
            "UA",
            "WF",
            "UY",
            "FO",
            "FJ",
            "PH",
            "FI",
            "FK",
            "FR",
            "GF",
            "PF",
            "TF",
            "HR",
            "CF",
            "TD",
            "ME",
            "CZ",
            "CL",
            "CH",
            "SE",
            "LK",
            "EC",
            "GQ",
            "ER",
            "EE",
            "ET",
            "ZA",
            "GS",
            "KR",
            "SS",
            "JM",
            "JP",
        ],
    },

    check_redirect: function () {
        let stored_lang = localStorage.getItem('delo_lang');
        if (stored_lang != null && stored_lang == 'ru') {
            // Русский сохранён
            window.location.href = this.redirect_data.link_ru + window.location.search;
        } else if (stored_lang != null && stored_lang == 'en') {
            // Английский сохранён
            window.location.href = this.redirect_data.link_ru + window.location.search;
        } else {
            // Не сохранено ничего
            this.redirect_request(this.redirect_data);
        }

    },

    redirect_request: function (redirect_data) {
        var request = new XMLHttpRequest();

        request.open("GET", "https://geo.tildacdn.com/geo/full/", true);
        request.timeout = 1000 * 15;
        request.onload = () => {
            var geo = JSON.parse(request.response);
            if (this.status >= 200 && this.status < 400) {
                this.mixed_redirect(geo, redirect_data);
            } else {
                this.mixed_redirect(geo, redirect_data);
            }
        };
        request.send();
    },

    mixed_redirect: function (geo, redirect_data) {
        if (!geo || !redirect_data) return;
        if (!window.isSearchBot) {
            var city = geo.city.name_en;
            var region = geo.region.name_en;
            var country = geo.country.iso;

            Array.prototype.forEach.call(redirect_data, (value) => {
                // Проверка перехода на англ.
                if (
                    value.geo_en.indexOf(country) !== -1 ||
                    value.geo_en.indexOf(region) !== -1 ||
                    value.geo_en.indexOf(city) !== -1
                ) {
                    localStorage.setItem('delo_lang', 'en');
                    if (this.location != 'en') {
                        window.location.href = value.link_en + window.location.search;
                    }
                }
                // Проверка перехода на ру.
                if (
                    value.geo_ru.indexOf(country) !== -1 ||
                    value.geo_ru.indexOf(region) !== -1 ||
                    value.geo_ru.indexOf(city) !== -1
                ) {
                    localStorage.setItem('delo_lang', 'ru');
                    if (this.location != 'ru') {
                        window.location.href = value.link_ru + window.location.search;
                    }
                }
            });
        }
    },
};
