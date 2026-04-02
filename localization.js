/**
 * Localization System
 * Handles IP detection, language loading, currency conversion, and placeholder replacement
 */

class LocalizationSystem {
  constructor() {
    this.currentCountryCode = null;
    this.currenciesData = null; // Store all currencies
    this.countryMapping = {
      // Europe - Euro
      'NL': { lang: 'nl', currency: 'EUR' },
      'BE': { lang: 'nl', currency: 'EUR' },
      'DE': { lang: 'de', currency: 'EUR' },
      'AT': { lang: 'de', currency: 'EUR' },
      'CH': { lang: 'de', currency: 'CHF' },  // Switzerland - Swiss Franc
      'FR': { lang: 'fr', currency: 'EUR' },
      'IT': { lang: 'it', currency: 'EUR' },
      'ES': { lang: 'es', currency: 'EUR' },
      'PT': { lang: 'pt', currency: 'EUR' },
      'IE': { lang: 'en', currency: 'EUR' },
      'PL': { lang: 'pl', currency: 'PLN' },  // Poland - Zloty
      'RO': { lang: 'ro', currency: 'RON' },  // Romania - Leu
      'GR': { lang: 'el', currency: 'EUR' },  // Greece
      'CY': { lang: 'el', currency: 'EUR' },  // Cyprus
      'HU': { lang: 'hu', currency: 'HUF' },  // Hungary - Forint
      'CZ': { lang: 'cs', currency: 'CZK' },  // Czech Republic - Koruna
      'SK': { lang: 'sk', currency: 'EUR' },  // Slovakia
      'DK': { lang: 'da', currency: 'DKK' },  // Denmark - Krone
      'BG': { lang: 'bg', currency: 'BGN' },  // Bulgaria - Lev
      'SI': { lang: 'sl', currency: 'EUR' },  // Slovenia
      'HR': { lang: 'sr', currency: 'HRK' },  // Croatia - Kuna
      'LT': { lang: 'lt', currency: 'EUR' },  // Lithuania
      'LV': { lang: 'lv', currency: 'EUR' },  // Latvia
      'EE': { lang: 'et', currency: 'EUR' },  // Estonia
      'FI': { lang: 'fi', currency: 'EUR' },  // Finland
      'SE': { lang: 'da', currency: 'SEK' },  // Sweden - Krona
      'NO': { lang: 'no', currency: 'NOK' },  // Norway - Krone
      'IS': { lang: 'no', currency: 'ISK' },  // Iceland - Króna

      // UK - Pound
      'GB': { lang: 'en', currency: 'GBP' },

      // North America
      'US': { lang: 'en', currency: 'USD' },
      'CA': { lang: 'en', currency: 'CAD' },

      // Australia & New Zealand
      'AU': { lang: 'en', currency: 'AUD' },
      'NZ': { lang: 'en', currency: 'NZD' },

      // South America & Latin America
      'BR': { lang: 'pt', currency: 'BRL' },  // Brazil - Real
      'MX': { lang: 'es', currency: 'MXN' },  // Mexico - Peso
      'AR': { lang: 'es', currency: 'ARS' },  // Argentina - Peso
      'CO': { lang: 'es', currency: 'COP' },  // Colombia - Peso
      'CL': { lang: 'es', currency: 'CLP' },  // Chile - Peso
      'PE': { lang: 'es', currency: 'USD' },  // Peru
      'VE': { lang: 'es', currency: 'USD' },  // Venezuela
      'EC': { lang: 'es', currency: 'USD' },  // Ecuador
      'GT': { lang: 'es', currency: 'USD' },  // Guatemala
      'CU': { lang: 'es', currency: 'USD' },  // Cuba
      'BO': { lang: 'es', currency: 'USD' },  // Bolivia
      'DO': { lang: 'es', currency: 'USD' },  // Dominican Republic
      'HN': { lang: 'es', currency: 'USD' },  // Honduras
      'PY': { lang: 'es', currency: 'USD' },  // Paraguay
      'SV': { lang: 'es', currency: 'USD' },  // El Salvador
      'NI': { lang: 'es', currency: 'USD' },  // Nicaragua
      'CR': { lang: 'es', currency: 'USD' },  // Costa Rica
      'PA': { lang: 'es', currency: 'USD' },  // Panama
      'UY': { lang: 'es', currency: 'USD' },  // Uruguay
      'PR': { lang: 'es', currency: 'USD' },  // Puerto Rico

      // Asia
      'JP': { lang: 'ja', currency: 'JPY' },  // Japan - Yen
      'CN': { lang: 'zh', currency: 'CNY' },  // China - Yuan
      'IN': { lang: 'en', currency: 'INR' },  // India - Rupee
      'KR': { lang: 'ko', currency: 'KRW' },  // South Korea - Won
      'NP': { lang: 'ne', currency: 'NPR' },  // Nepal - Rupee

      // Eastern Europe
      'RU': { lang: 'ru', currency: 'RUB' },  // Russia - Ruble
      'UA': { lang: 'uk', currency: 'UAH' },  // Ukraine - Hryvnia
      'BY': { lang: 'be', currency: 'BYN' },  // Belarus - Ruble
      'MD': { lang: 'ro', currency: 'USD' },  // Moldova
      'RS': { lang: 'sr', currency: 'RSD' },  // Serbia - Dinar
      'BA': { lang: 'sr', currency: 'RSD' },  // Bosnia and Herzegovina
      'ME': { lang: 'sr', currency: 'RSD' },  // Montenegro
      'MK': { lang: 'mk', currency: 'MKD' },  // North Macedonia - Denar
      'AL': { lang: 'sq', currency: 'ALL' },  // Albania - Lek
      'XK': { lang: 'sq', currency: 'ALL' },  // Kosovo

      // Middle East
      'TR': { lang: 'tr', currency: 'TRY' },  // Turkey - Lira
      'IR': { lang: 'fa', currency: 'IRR' },  // Iran - Rial
      'AF': { lang: 'ps', currency: 'AFN' },  // Afghanistan - Afghani
      'AM': { lang: 'hy', currency: 'AMD' },  // Armenia - Dram
      'GE': { lang: 'ka', currency: 'GEL' },  // Georgia - Lari

      // Middle East - Arabic
      'SA': { lang: 'ar', currency: 'SAR' },  // Saudi Arabia - Riyal
      'AE': { lang: 'ar', currency: 'AED' },  // UAE - Dirham
      'EG': { lang: 'ar', currency: 'EGP' },  // Egypt - Pound
      'JO': { lang: 'ar', currency: 'USD' },  // Jordan
      'KW': { lang: 'ar', currency: 'USD' },  // Kuwait
      'QA': { lang: 'ar', currency: 'USD' },  // Qatar
      'BH': { lang: 'ar', currency: 'USD' },  // Bahrain
      'OM': { lang: 'ar', currency: 'USD' },  // Oman
      'LB': { lang: 'ar', currency: 'USD' },  // Lebanon
      'IQ': { lang: 'ar', currency: 'USD' },  // Iraq
      'SY': { lang: 'ar', currency: 'USD' },  // Syria
      'YE': { lang: 'ar', currency: 'USD' },  // Yemen
      'MA': { lang: 'ar', currency: 'USD' },  // Morocco
      'DZ': { lang: 'ar', currency: 'USD' },  // Algeria
      'TN': { lang: 'ar', currency: 'USD' },  // Tunisia
      'LY': { lang: 'ar', currency: 'USD' },  // Libya
      'SD': { lang: 'ar', currency: 'USD' },  // Sudan
      'PS': { lang: 'ar', currency: 'USD' },  // Palestine

      // South Asia
      'BD': { lang: 'bn', currency: 'BDT' },  // Bangladesh - Taka
      'PK': { lang: 'ur', currency: 'PKR' },  // Pakistan - Rupee
      'LK': { lang: 'si', currency: 'LKR' },  // Sri Lanka - Rupee

      // Central Asia
      'UZ': { lang: 'uz', currency: 'UZS' },  // Uzbekistan - Som
      'KZ': { lang: 'kk', currency: 'KZT' },  // Kazakhstan - Tenge
      'TM': { lang: 'tk', currency: 'TMT' },  // Turkmenistan - Manat
      'AZ': { lang: 'az', currency: 'AZN' },  // Azerbaijan - Manat
      'MN': { lang: 'mn', currency: 'MNT' },  // Mongolia - Tugrik
      'TJ': { lang: 'tg', currency: 'TJS' },  // Tajikistan - Somoni
      'KG': { lang: 'ru', currency: 'KGS' },  // Kyrgyzstan - Som

      // Southeast Asia
      'ID': { lang: 'id', currency: 'IDR' },  // Indonesia - Rupiah
      'MY': { lang: 'ms', currency: 'MYR' },  // Malaysia - Ringgit
      'SG': { lang: 'ms', currency: 'SGD' },  // Singapore - Dollar
      'BN': { lang: 'ms', currency: 'USD' },  // Brunei
      'TH': { lang: 'th', currency: 'THB' },  // Thailand - Baht
      'VN': { lang: 'vi', currency: 'VND' },  // Vietnam - Dong
      'PH': { lang: 'en', currency: 'PHP' },  // Philippines - Peso
      'MM': { lang: 'my', currency: 'MMK' },  // Myanmar - Kyat
      'KH': { lang: 'km', currency: 'KHR' },  // Cambodia - Riel
      'LA': { lang: 'lo', currency: 'LAK' },  // Laos - Kip

      // East Africa
      'KE': { lang: 'sw', currency: 'KES' },  // Kenya - Shilling
      'TZ': { lang: 'sw', currency: 'USD' },  // Tanzania
      'UG': { lang: 'sw', currency: 'USD' },  // Uganda
      'SO': { lang: 'so', currency: 'USD' },  // Somalia
      'DJ': { lang: 'so', currency: 'USD' },  // Djibouti
      'ER': { lang: 'ti', currency: 'USD' },  // Eritrea
      'ET': { lang: 'ti', currency: 'USD' },  // Ethiopia
      'MG': { lang: 'mg', currency: 'USD' },  // Madagascar
      'RW': { lang: 'sw', currency: 'USD' },  // Rwanda
      'BI': { lang: 'sw', currency: 'USD' },  // Burundi

      // West Africa
      'NG': { lang: 'en', currency: 'NGN' },  // Nigeria - Naira
      'GH': { lang: 'en', currency: 'USD' },  // Ghana
      'CI': { lang: 'fr', currency: 'USD' },  // Ivory Coast
      'SN': { lang: 'fr', currency: 'USD' },  // Senegal
      'CM': { lang: 'fr', currency: 'USD' },  // Cameroon
      'BF': { lang: 'fr', currency: 'USD' },  // Burkina Faso
      'ML': { lang: 'fr', currency: 'USD' },  // Mali
      'NE': { lang: 'fr', currency: 'USD' },  // Niger
      'TD': { lang: 'fr', currency: 'USD' },  // Chad
      'BJ': { lang: 'fr', currency: 'USD' },  // Benin
      'TG': { lang: 'fr', currency: 'USD' },  // Togo
      'SL': { lang: 'en', currency: 'USD' },  // Sierra Leone
      'LR': { lang: 'en', currency: 'USD' },  // Liberia
      'GN': { lang: 'fr', currency: 'USD' },  // Guinea
      'GM': { lang: 'en', currency: 'USD' },  // Gambia
      'GW': { lang: 'pt', currency: 'USD' },  // Guinea-Bissau
      'MR': { lang: 'ar', currency: 'USD' },  // Mauritania

      // Southern Africa
      'ZA': { lang: 'en', currency: 'ZAR' },  // South Africa - Rand
      'ZW': { lang: 'en', currency: 'USD' },  // Zimbabwe
      'BW': { lang: 'en', currency: 'USD' },  // Botswana
      'NA': { lang: 'en', currency: 'USD' },  // Namibia
      'LS': { lang: 'en', currency: 'USD' },  // Lesotho
      'SZ': { lang: 'en', currency: 'USD' },  // Eswatini
      'MZ': { lang: 'pt', currency: 'USD' },  // Mozambique
      'AO': { lang: 'pt', currency: 'USD' },  // Angola
      'ZM': { lang: 'en', currency: 'USD' },  // Zambia
      'MW': { lang: 'en', currency: 'USD' },  // Malawi

      // Central Africa
      'CD': { lang: 'fr', currency: 'USD' },  // DR Congo
      'CG': { lang: 'fr', currency: 'USD' },  // Republic of Congo
      'GA': { lang: 'fr', currency: 'USD' },  // Gabon
      'GQ': { lang: 'es', currency: 'USD' },  // Equatorial Guinea
      'CF': { lang: 'fr', currency: 'USD' },  // Central African Republic
      'ST': { lang: 'pt', currency: 'USD' },  // São Tomé and Príncipe

      // North Africa (not yet covered)
      'EH': { lang: 'ar', currency: 'USD' },  // Western Sahara

      // Caribbean
      'JM': { lang: 'en', currency: 'USD' },  // Jamaica
      'HT': { lang: 'fr', currency: 'USD' },  // Haiti
      'TT': { lang: 'en', currency: 'USD' },  // Trinidad and Tobago
      'BS': { lang: 'en', currency: 'USD' },  // Bahamas
      'BB': { lang: 'en', currency: 'USD' },  // Barbados
      'LC': { lang: 'en', currency: 'USD' },  // Saint Lucia
      'GD': { lang: 'en', currency: 'USD' },  // Grenada
      'VC': { lang: 'en', currency: 'USD' },  // Saint Vincent
      'AG': { lang: 'en', currency: 'USD' },  // Antigua and Barbuda
      'DM': { lang: 'en', currency: 'USD' },  // Dominica
      'KN': { lang: 'en', currency: 'USD' },  // Saint Kitts and Nevis
      'CW': { lang: 'nl', currency: 'USD' },  // Curaçao
      'AW': { lang: 'nl', currency: 'USD' },  // Aruba
      'BQ': { lang: 'nl', currency: 'USD' },  // Caribbean Netherlands
      'SX': { lang: 'nl', currency: 'USD' },  // Sint Maarten

      // More Asia/Pacific
      'TW': { lang: 'zh', currency: 'USD' },  // Taiwan
      'HK': { lang: 'zh', currency: 'HKD' },  // Hong Kong
      'MO': { lang: 'zh', currency: 'USD' },  // Macau
      'BT': { lang: 'en', currency: 'USD' },  // Bhutan
      'MV': { lang: 'en', currency: 'USD' },  // Maldives
      'TL': { lang: 'pt', currency: 'USD' },  // Timor-Leste

      // Oceania/Pacific Islands
      'FJ': { lang: 'en', currency: 'USD' },  // Fiji
      'PG': { lang: 'en', currency: 'USD' },  // Papua New Guinea
      'NC': { lang: 'fr', currency: 'USD' },  // New Caledonia
      'PF': { lang: 'fr', currency: 'USD' },  // French Polynesia
      'SB': { lang: 'en', currency: 'USD' },  // Solomon Islands
      'VU': { lang: 'fr', currency: 'USD' },  // Vanuatu
      'WS': { lang: 'en', currency: 'USD' },  // Samoa
      'TO': { lang: 'en', currency: 'USD' },  // Tonga
      'KI': { lang: 'en', currency: 'USD' },  // Kiribati
      'FM': { lang: 'en', currency: 'USD' },  // Micronesia
      'MH': { lang: 'en', currency: 'USD' },  // Marshall Islands
      'PW': { lang: 'en', currency: 'USD' },  // Palau
      'TV': { lang: 'en', currency: 'USD' },  // Tuvalu
      'NR': { lang: 'en', currency: 'USD' },  // Nauru
      'CK': { lang: 'en', currency: 'USD' },  // Cook Islands
      'NU': { lang: 'en', currency: 'USD' },  // Niue
      'TK': { lang: 'en', currency: 'USD' },  // Tokelau
      'AS': { lang: 'en', currency: 'USD' },  // American Samoa
      'GU': { lang: 'en', currency: 'USD' },  // Guam
      'MP': { lang: 'en', currency: 'USD' },  // Northern Mariana Islands

      // More Europe
      'AD': { lang: 'es', currency: 'EUR' },  // Andorra
      'MC': { lang: 'fr', currency: 'EUR' },  // Monaco
      'LI': { lang: 'de', currency: 'CHF' },  // Liechtenstein
      'SM': { lang: 'it', currency: 'EUR' },  // San Marino
      'VA': { lang: 'it', currency: 'EUR' },  // Vatican City
      'MT': { lang: 'en', currency: 'EUR' },  // Malta
      'LU': { lang: 'fr', currency: 'EUR' },  // Luxembourg
      'FO': { lang: 'da', currency: 'DKK' },  // Faroe Islands
      'GI': { lang: 'en', currency: 'GBP' },  // Gibraltar
      'JE': { lang: 'en', currency: 'GBP' },  // Jersey
      'GG': { lang: 'en', currency: 'GBP' },  // Guernsey
      'IM': { lang: 'en', currency: 'GBP' },  // Isle of Man
      'AX': { lang: 'fi', currency: 'EUR' },  // Åland Islands
      'GL': { lang: 'da', currency: 'DKK' },  // Greenland

      // More Middle East
      'IL': { lang: 'en', currency: 'ILS' },  // Israel
      'YT': { lang: 'fr', currency: 'EUR' },  // Mayotte

      // Territories and others
      'RE': { lang: 'fr', currency: 'EUR' },  // Réunion
      'GP': { lang: 'fr', currency: 'EUR' },  // Guadeloupe
      'MQ': { lang: 'fr', currency: 'EUR' },  // Martinique
      'GF': { lang: 'fr', currency: 'EUR' },  // French Guiana
      'PM': { lang: 'fr', currency: 'EUR' },  // Saint Pierre and Miquelon
      'WF': { lang: 'fr', currency: 'USD' },  // Wallis and Futuna
      'BL': { lang: 'fr', currency: 'EUR' },  // Saint Barthélemy
      'MF': { lang: 'fr', currency: 'EUR' },  // Saint Martin
      'VI': { lang: 'en', currency: 'USD' },  // US Virgin Islands
      'VG': { lang: 'en', currency: 'USD' },  // British Virgin Islands
      'KY': { lang: 'en', currency: 'USD' },  // Cayman Islands
      'BM': { lang: 'en', currency: 'USD' },  // Bermuda
      'TC': { lang: 'en', currency: 'USD' },  // Turks and Caicos
      'AI': { lang: 'en', currency: 'USD' },  // Anguilla
      'MS': { lang: 'en', currency: 'USD' },  // Montserrat
      'FK': { lang: 'en', currency: 'GBP' },  // Falkland Islands
      'GS': { lang: 'en', currency: 'GBP' },  // South Georgia
      'SH': { lang: 'en', currency: 'GBP' }   // Saint Helena
    };

    this.fallback = { lang: 'en', currency: 'USD' };
    this.currencyData = null;
    this.formattedAmount = null;
    this.translations = null; // Store loaded translations
    this.currentLanguage = 'en'; // Current language code
  }

  /**
   * Get URL parameter by name
   */
  getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  /**
   * Get user's country via IP geolocation
   */
  async getCountryCode() {
    // Check if country is forced via URL parameter first
    const urlCountry = this.getURLParameter('country');
    if (urlCountry) {
      console.log(`Country forced via URL: ${urlCountry.toUpperCase()}`);
      return urlCountry.toUpperCase();
    }

    // Otherwise detect via IP
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code;
    } catch (error) {
      console.error('IP detection failed:', error);
      return null;
    }
  }

  /**
   * Get user context: country → language + currency
   */
  async getUserContext() {
    const countryCode = await this.getCountryCode();
    console.log('🌍 Detected country code:', countryCode);

    let mapping;
    if (countryCode && this.countryMapping[countryCode]) {
      mapping = this.countryMapping[countryCode];
      console.log('✅ Found mapping for', countryCode, ':', mapping);
    } else {
      mapping = this.fallback;
      console.log('⚠️ No mapping found for', countryCode, ', using fallback:', mapping);
    }

    const context = {
      countryCode: countryCode || 'US',  // Default to US instead of UNKNOWN
      languageCode: mapping.lang,
      currencyCode: mapping.currency
    };

    console.log('📋 User context:', context);
    console.log('   → Language:', context.languageCode);
    console.log('   → Currency:', context.currencyCode);
    console.log('   → Country:', context.countryCode);

    return context;
  }

  /**
   * Load all currencies from single JSON file
   */
  async loadCurrencies() {
    // First try to load from external file
    try {
      console.log('Attempting to load currencies.json from:', window.location.origin + '/currencies.json');
      const response = await fetch('currencies.json');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Verify we got valid data
      if (!data || typeof data !== 'object' || Object.keys(data).length < 5) {
        throw new Error('Invalid currency data received');
      }

      this.currenciesData = data;
      console.log('✅ Currencies loaded from JSON:', Object.keys(this.currenciesData).length, 'currencies');
      return;
    } catch (error) {
      console.error('❌ Failed to load currencies.json:', error);
      console.error('Error details:', error.message);
      console.log('Loading embedded fallback currency data...');
    }

    // Fallback: Use embedded currency data
    this.loadEmbeddedCurrencies();
  }

  /**
   * Load embedded fallback currencies
   */
  loadEmbeddedCurrencies() {
    this.currenciesData = {
      "USD": { "currencyCode": "USD", "currencySymbol": "$", "exchangeRateFromUSD": 1.0, "locale": "en-US", "countries": ["US", "EC", "PA", "SV"] },
      "EUR": { "currencyCode": "EUR", "currencySymbol": "€", "exchangeRateFromUSD": 0.92, "locale": "de-DE", "countries": ["DE", "FR", "IT", "ES", "PT", "NL", "BE", "AT", "GR", "IE", "FI", "SK", "SI", "CY", "LU", "MT", "EE", "LV", "LT"] },
      "GBP": { "currencyCode": "GBP", "currencySymbol": "£", "exchangeRateFromUSD": 0.79, "locale": "en-GB", "countries": ["GB"] },
      "JPY": { "currencyCode": "JPY", "currencySymbol": "¥", "exchangeRateFromUSD": 149.5, "locale": "ja-JP", "countries": ["JP"] },
      "CNY": { "currencyCode": "CNY", "currencySymbol": "¥", "exchangeRateFromUSD": 7.24, "locale": "zh-CN", "countries": ["CN"] },
      "AUD": { "currencyCode": "AUD", "currencySymbol": "A$", "exchangeRateFromUSD": 1.52, "locale": "en-AU", "countries": ["AU"] },
      "CAD": { "currencyCode": "CAD", "currencySymbol": "C$", "exchangeRateFromUSD": 1.35, "locale": "en-CA", "countries": ["CA"] },
      "CHF": { "currencyCode": "CHF", "currencySymbol": "CHF", "exchangeRateFromUSD": 0.88, "locale": "de-CH", "countries": ["CH"] },
      "INR": { "currencyCode": "INR", "currencySymbol": "₹", "exchangeRateFromUSD": 83.2, "locale": "hi-IN", "countries": ["IN"] },
      "KRW": { "currencyCode": "KRW", "currencySymbol": "₩", "exchangeRateFromUSD": 1340, "locale": "ko-KR", "countries": ["KR"] },
      "BRL": { "currencyCode": "BRL", "currencySymbol": "R$", "exchangeRateFromUSD": 5.05, "locale": "pt-BR", "countries": ["BR"] },
      "RUB": { "currencyCode": "RUB", "currencySymbol": "₽", "exchangeRateFromUSD": 91.5, "locale": "ru-RU", "countries": ["RU"] },
      "MXN": { "currencyCode": "MXN", "currencySymbol": "MX$", "exchangeRateFromUSD": 17.2, "locale": "es-MX", "countries": ["MX"] },
      "ZAR": { "currencyCode": "ZAR", "currencySymbol": "R", "exchangeRateFromUSD": 18.5, "locale": "en-ZA", "countries": ["ZA"] },
      "TRY": { "currencyCode": "TRY", "currencySymbol": "₺", "exchangeRateFromUSD": 32.5, "locale": "tr-TR", "countries": ["TR"] },
      "AED": { "currencyCode": "AED", "currencySymbol": "د.إ", "exchangeRateFromUSD": 3.67, "locale": "ar-AE", "countries": ["AE"] },
      "SAR": { "currencyCode": "SAR", "currencySymbol": "ر.س", "exchangeRateFromUSD": 3.75, "locale": "ar-SA", "countries": ["SA"] },
      "SGD": { "currencyCode": "SGD", "currencySymbol": "S$", "exchangeRateFromUSD": 1.34, "locale": "en-SG", "countries": ["SG"] },
      "HKD": { "currencyCode": "HKD", "currencySymbol": "HK$", "exchangeRateFromUSD": 7.82, "locale": "zh-HK", "countries": ["HK"] },
      "NOK": { "currencyCode": "NOK", "currencySymbol": "kr", "exchangeRateFromUSD": 10.8, "locale": "no-NO", "countries": ["NO"] },
      "SEK": { "currencyCode": "SEK", "currencySymbol": "kr", "exchangeRateFromUSD": 10.5, "locale": "sv-SE", "countries": ["SE"] },
      "DKK": { "currencyCode": "DKK", "currencySymbol": "kr", "exchangeRateFromUSD": 6.88, "locale": "da-DK", "countries": ["DK"] },
      "PLN": { "currencyCode": "PLN", "currencySymbol": "zł", "exchangeRateFromUSD": 4.02, "locale": "pl-PL", "countries": ["PL"] },
      "THB": { "currencyCode": "THB", "currencySymbol": "฿", "exchangeRateFromUSD": 35.8, "locale": "th-TH", "countries": ["TH"] },
      "IDR": { "currencyCode": "IDR", "currencySymbol": "Rp", "exchangeRateFromUSD": 15750, "locale": "id-ID", "countries": ["ID"] },
      "MYR": { "currencyCode": "MYR", "currencySymbol": "RM", "exchangeRateFromUSD": 4.48, "locale": "ms-MY", "countries": ["MY"] },
      "PHP": { "currencyCode": "PHP", "currencySymbol": "₱", "exchangeRateFromUSD": 56.2, "locale": "tl-PH", "countries": ["PH"] },
      "VND": { "currencyCode": "VND", "currencySymbol": "₫", "exchangeRateFromUSD": 24500, "locale": "vi-VN", "countries": ["VN"] },
      "NZD": { "currencyCode": "NZD", "currencySymbol": "NZ$", "exchangeRateFromUSD": 1.65, "locale": "en-NZ", "countries": ["NZ"] },
      "ARS": { "currencyCode": "ARS", "currencySymbol": "$", "exchangeRateFromUSD": 850, "locale": "es-AR", "countries": ["AR"] },
      "CLP": { "currencyCode": "CLP", "currencySymbol": "$", "exchangeRateFromUSD": 950, "locale": "es-CL", "countries": ["CL"] },
      "COP": { "currencyCode": "COP", "currencySymbol": "$", "exchangeRateFromUSD": 4050, "locale": "es-CO", "countries": ["CO"] }
    };
    console.log('✅ Using embedded currency data:', Object.keys(this.currenciesData).length, 'currencies');
  }

  /**
   * Set currency for current country
   */
  setCurrency(currencyCode) {
    // Normalize to uppercase
    const code = currencyCode.toUpperCase();

    console.log('Setting currency:', code);

    // Get currency data
    this.currencyData = this.currenciesData[code];

    // Fallback to USD if currency not found
    if (!this.currencyData) {
      console.warn(`Currency ${code} not found, falling back to USD`);
      this.currencyData = this.currenciesData['USD'];
    }

    // Calculate formatted amount (base $500)
    const baseAmount = 500;
    const convertedAmount = Math.round(baseAmount * this.currencyData.exchangeRateFromUSD);

    // Format with proper locale
    const formattedNumber = convertedAmount.toLocaleString(this.currencyData.locale || 'en-US');
    this.formattedAmount = `${this.currencyData.currencySymbol}${formattedNumber}`;

    console.log('✅ Currency set:', {
      code: this.currencyData.currencyCode,
      symbol: this.currencyData.currencySymbol,
      rate: this.currencyData.exchangeRateFromUSD,
      convertedAmount: convertedAmount,
      formattedAmount: this.formattedAmount
    });
  }

  /**
   * Get embedded translations (works without web server)
   */
  getEmbeddedTranslations() {
    // Use globally loaded translations if available
    if (window.EMBEDDED_TRANSLATIONS) {
      return window.EMBEDDED_TRANSLATIONS;
    }

    // Fallback with just English if the translations file didn't load
    return {
      en: {"hero":{"badge":"🎉 YOU'VE QUALIFIED!","title":"Congratulations!","subtitle":"Today you have a chance to win an exclusive reward!","socialProof":{"claimedLabel":"Claimed Today","ratingLabel":"Rated"},"ctaButton":"Claim My Reward","ctaArrow":"→"},"header":{"name":"Rewards Center","status":"Online Now"},"urgency":{"text":"Offer expires in","icon":"⚡"},"chat":{"timeBubble":"Just now","timeStamp":"Now","sender":"Rewards Center"},"messages":{"greeting":"Hi there! 👋 Congratulations on qualifying for your {amount}!","intro":"We just need to confirm you're eligible. This will only take 2 simple questions... ✅","question1":{"label":"Question 1 of 2:","text":"Is this your first time here?","answerYes":"Yes","answerNo":"No"},"progress":"Perfect! ✨ One more question...","question2":{"label":"Question 2 of 2:","text":"Are you a resident of {country}?","answerYes":"Yes","answerNo":"No"},"verifying":"Verifying your eligibility...","success":{"title":"🎉 CONGRATULATIONS!","text":"You've been verified and confirmed as eligible!","reservation":"Your {amount} is reserved for the next {time}."},"nextSteps":{"title":"📋 Next Steps:","step1":"1️⃣ Click \"Claim now\" below","step2":"2️⃣ Complete the final steps on our partners page","step3":"3️⃣ Your reward will be processed instantly!","warning":"⚠️ Time-sensitive - act now!"}},"finalCta":{"icon":"🎁","text":"Claim My {amount} Now","arrow":"→","badges":{"secure":"🔒 Secure","verified":"✓ Verified","instant":"⚡ Instant"}},"exitModal":{"icon":"⚠️","title":"Wait! Don't miss out!","message":"{count} people abandoned their reward today and regretted it.","availability":"Your {amount} is still available for {time}.","stayButton":"Stay and Claim My Reward →","leaveButton":"No thanks, I'm leaving"},"expired":{"icon":"⏰","title":"Time's Up!","message":"Your reservation has expired. Please refresh to try again.","button":"Refresh Page"}}
    };
  }

  /**
   * Load language translations from JSON file or embedded fallback
   */
  async loadLanguage(languageCode) {
    // Try to load from embedded translations first (works without server)
    const embedded = this.getEmbeddedTranslations();
    const availableLanguages = Object.keys(embedded).length;

    console.log(`📚 ${availableLanguages} languages available in embedded data`);

    if (embedded[languageCode]) {
      this.translations = embedded[languageCode];
      this.currentLanguage = languageCode;
      console.log(`✅ Language loaded from embedded data: ${languageCode}`);
      console.log('📝 Translations sample:', {
        heroBadge: this.translations.hero?.badge,
        heroTitle: this.translations.hero?.title
      });
      return this.translations;
    }

    // If not in embedded, try to fetch from file (only works with web server)
    try {
      console.log(`🌍 Loading language file: languages/${languageCode}.json`);
      const response = await fetch(`languages/${languageCode}.json`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.translations = await response.json();
      this.currentLanguage = languageCode;
      console.log(`✅ Language loaded from file: ${languageCode}`);
      return this.translations;
    } catch (error) {
      console.error(`❌ Failed to load language ${languageCode}:`, error.message);

      // Fallback to English from embedded
      if (languageCode !== 'en' && embedded.en) {
        console.log('🔄 Falling back to embedded English...');
        this.translations = embedded.en;
        this.currentLanguage = 'en';
        return this.translations;
      }

      throw error;
    }
  }

  /**
   * Get translated string with placeholder replacement
   */
  t(key, placeholders = {}) {
    if (!this.translations) {
      console.warn('Translations not loaded yet');
      return key;
    }

    // Navigate nested object path (e.g., "hero.title")
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // If value is not a string, return the key
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Replace placeholders
    let result = value;
    for (const [placeholder, replacement] of Object.entries(placeholders)) {
      result = result.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacement);
    }

    return result;
  }

  /**
   * Initialize the system
   */
  async init() {
    console.log('=== Localization Init Started ===');
    console.log('Current URL:', window.location.href);
    console.log('Protocol:', window.location.protocol);

    // Warn if running from file:// protocol
    if (window.location.protocol === 'file:') {
      console.warn('⚠️ Running from file:// protocol. This may cause CORS issues with fetch().');
      console.warn('⚠️ Please run from a local web server (e.g., Live Server, http-server, or python -m http.server)');
    }

    // Load all currencies once
    await this.loadCurrencies();

    // Get user context
    const context = await this.getUserContext();
    this.currentCountryCode = context.countryCode;

    // Set currency based on context
    this.setCurrency(context.currencyCode);

    // Load language translations
    await this.loadLanguage(context.languageCode);

    console.log('✅ Localization initialized:', context);
    console.log('=== Localization Init Complete ===');

    return context;
  }

  /**
   * Get currency image path for current country
   */
  getCurrencyImagePath() {
    return `images/${this.currentCountryCode}_currency.png`;
  }

  /**
   * Get country name from country code
   */
  getCountryName() {
    // This would ideally come from a proper country names database
    // For now, return the country code as fallback
    return this.currentCountryCode;
  }
}

// Make it globally available
window.LocalizationSystem = LocalizationSystem;
