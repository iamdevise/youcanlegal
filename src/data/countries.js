// Country list for the application form — mirrors the original site's selects.
// Entries: [label shown in the picker, dial code, ISO 3166-1 alpha-2 code]
//
// The ISO code is used to render a locally bundled flag SVG from
// /assets/flags/<iso>.svg (no hotlinked images). The label keeps the
// native-name suffix the original site used, e.g. "India (भारत)".
export const COUNTRIES = [
  ['Kenya', '+254', 'ke'], ['Nigeria', '+234', 'ng'], ['Ghana (Gaana)', '+233', 'gh'], ['South Africa', '+27', 'za'],
  ['India (भारत)', '+91', 'in'], ['Pakistan (‫پاکستان‬‎)', '+92', 'pk'], ['Sri Lanka (ශ්‍රී ලංකාව)', '+94', 'lk'],
  ['Philippines', '+63', 'ph'], ['Vietnam (Việt Nam)', '+84', 'vn'], ['Somalia (Soomaaliya)', '+252', 'so'],
  ['Tanzania', '+255', 'tz'], ['Ethiopia', '+251', 'et'], ['Nepal (नेपाल)', '+977', 'np'], ['Afghanistan (‫افغانستان‬‎)', '+93', 'af'],
  ['Åland Islands (Åland)', '+358', 'ax'], ['Albania (Shqipëri)', '+355', 'al'], ['Algeria (‫الجزائر‬‎)', '+213', 'dz'],
  ['American Samoa', '+1', 'as'], ['Andorra', '+376', 'ad'], ['Angola', '+244', 'ao'], ['Anguilla', '+1', 'ai'],
  ['Antarctica', '+672', 'aq'], ['Antigua and Barbuda', '+1', 'ag'], ['Argentina', '+54', 'ar'], ['Armenia (Հայաստան)', '+374', 'am'],
  ['Aruba', '+297', 'aw'], ['Australia', '+61', 'au'], ['Austria (Österreich)', '+43', 'at'], ['Azerbaijan (Azərbaycan)', '+994', 'az'],
  ['Bahamas', '+1', 'bs'], ['Bahrain (‫البحرين‬‎)', '+973', 'bh'], ['Bangladesh (বাংলাদেশ)', '+880', 'bd'], ['Barbados', '+1', 'bb'],
  ['Belarus (Беларусь)', '+375', 'by'], ['Belgium (België)', '+32', 'be'], ['Belize', '+501', 'bz'], ['Benin (Bénin)', '+229', 'bj'],
  ['Bermuda', '+1', 'bm'], ['Bhutan (འབྲུག)', '+975', 'bt'], ['Bolivia', '+591', 'bo'], ['Bosnia and Herzegovina (Босна и Херцеговина)', '+387', 'ba'],
  ['Botswana', '+267', 'bw'], ['Brazil (Brasil)', '+55', 'br'], ['British Indian Ocean Territory', '+246', 'io'],
  ['British Virgin Islands', '+1', 'vg'], ['Brunei', '+673', 'bn'], ['Bulgaria (България)', '+359', 'bg'],
  ['Burkina Faso', '+226', 'bf'], ['Burundi (Uburundi)', '+257', 'bi'], ['Cambodia (កម្ពុជា)', '+855', 'kh'],
  ['Cameroon (Cameroun)', '+237', 'cm'], ['Canada', '+1', 'ca'], ['Cape Verde (Kabu Verdi)', '+238', 'cv'],
  ['Caribbean Netherlands', '+599', 'bq'], ['Cayman Islands', '+1', 'ky'], ['Central African Republic (République Centrafricaine)', '+236', 'cf'],
  ['Chad (Tchad)', '+235', 'td'], ['Chile', '+56', 'cl'], ['China (中国)', '+86', 'cn'], ['Christmas Island', '+61', 'cx'],
  ['Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))', '+61', 'cc'], ['Colombia', '+57', 'co'],
  ['Comoros (‫جزر القمر‬‎)', '+269', 'km'], ['Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)', '+243', 'cd'],
  ['Congo (Republic) (Congo-Brazzaville)', '+242', 'cg'], ['Cook Islands', '+682', 'ck'], ['Costa Rica', '+506', 'cr'],
  ['Côte d’Ivoire', '+225', 'ci'], ['Croatia (Hrvatska)', '+385', 'hr'], ['Cuba', '+53', 'cu'], ['Curaçao', '+599', 'cw'],
  ['Cyprus (Κύπρος)', '+357', 'cy'], ['Czech Republic (Česká republika)', '+420', 'cz'], ['Denmark (Danmark)', '+45', 'dk'],
  ['Djibouti', '+253', 'dj'], ['Dominica', '+1', 'dm'], ['Dominican Republic (República Dominicana)', '+1', 'do'],
  ['Ecuador', '+593', 'ec'], ['Egypt (‫مصر‬‎)', '+20', 'eg'], ['El Salvador', '+503', 'sv'],
  ['Equatorial Guinea (Guinea Ecuatorial)', '+240', 'gq'], ['Eritrea', '+291', 'er'], ['Estonia (Eesti)', '+372', 'ee'],
  ['Falkland Islands (Islas Malvinas)', '+500', 'fk'], ['Faroe Islands (Føroyar)', '+298', 'fo'], ['Fiji', '+679', 'fj'],
  ['Finland (Suomi)', '+358', 'fi'], ['France', '+33', 'fr'], ['French Guiana (Guyane française)', '+594', 'gf'],
  ['French Polynesia (Polynésie française)', '+689', 'pf'], ['French Southern Territories (Terres australes françaises)', '+262', 'tf'],
  ['Gabon', '+241', 'ga'], ['Gambia', '+220', 'gm'], ['Georgia (საქართველო)', '+995', 'ge'], ['Germany (Deutschland)', '+49', 'de'],
  ['Gibraltar', '+350', 'gi'], ['Greece (Ελλάδα)', '+30', 'gr'], ['Greenland (Kalaallit Nunaat)', '+299', 'gl'],
  ['Grenada', '+1', 'gd'], ['Guadeloupe', '+590', 'gp'], ['Guam', '+1', 'gu'], ['Guatemala', '+502', 'gt'], ['Guernsey', '+44', 'gg'],
  ['Guinea (Guinée)', '+224', 'gn'], ['Guinea-Bissau (Guiné Bissau)', '+245', 'gw'], ['Guyana', '+592', 'gy'], ['Haiti', '+509', 'ht'],
  ['Heard Island and Mcdonald Islands', '+672', 'hm'], ['Honduras', '+504', 'hn'], ['Hong Kong (香港)', '+852', 'hk'],
  ['Hungary (Magyarország)', '+36', 'hu'], ['Iceland (Ísland)', '+354', 'is'], ['Indonesia', '+62', 'id'],
  ['Iran (‫ایران‬‎)', '+98', 'ir'], ['Iraq (‫العراق‬‎)', '+964', 'iq'], ['Ireland', '+353', 'ie'], ['Isle of Man', '+44', 'im'],
  ['Israel (‫ישראל‬‎)', '+972', 'il'], ['Italy (Italia)', '+39', 'it'], ['Jamaica', '+1', 'jm'], ['Japan (日本)', '+81', 'jp'],
  ['Jersey', '+44', 'je'], ['Jordan (‫الأردن‬‎)', '+962', 'jo'], ['Kazakhstan (Казахстан)', '+7', 'kz'],
  ['Kiribati', '+686', 'ki'], ['Kosovo (Kosovë)', '+383', 'xk'], ['Kuwait (‫الكويت‬‎)', '+965', 'kw'],
  ['Kyrgyzstan (Кыргызстан)', '+996', 'kg'], ['Laos (ລາວ)', '+856', 'la'], ['Latvia (Latvija)', '+371', 'lv'],
  ['Lebanon (‫لبنان‬‎)', '+961', 'lb'], ['Lesotho', '+266', 'ls'], ['Liberia', '+231', 'lr'], ['Libya (‫ليبيا‬‎)', '+218', 'ly'],
  ['Liechtenstein', '+423', 'li'], ['Lithuania (Lietuva)', '+370', 'lt'], ['Luxembourg', '+352', 'lu'], ['Macau (澳門)', '+853', 'mo'],
  ['Macedonia (FYROM) (Македонија)', '+389', 'mk'], ['Madagascar (Madagasikara)', '+261', 'mg'], ['Malawi', '+265', 'mw'],
  ['Malaysia', '+60', 'my'], ['Maldives', '+960', 'mv'], ['Mali', '+223', 'ml'], ['Malta', '+356', 'mt'],
  ['Marshall Islands', '+692', 'mh'], ['Martinique', '+596', 'mq'], ['Mauritania (‫موريتانيا‬‎)', '+222', 'mr'],
  ['Mauritius (Moris)', '+230', 'mu'], ['Mayotte', '+262', 'yt'], ['Mexico (México)', '+52', 'mx'], ['Micronesia', '+691', 'fm'],
  ['Moldova (Republica Moldova)', '+373', 'md'], ['Monaco', '+377', 'mc'], ['Mongolia (Монгол)', '+976', 'mn'],
  ['Montenegro (Crna Gora)', '+382', 'me'], ['Montserrat', '+1', 'ms'], ['Morocco (‫المغرب‬‎)', '+212', 'ma'],
  ['Mozambique (Moçambique)', '+258', 'mz'], ['Myanmar (Burma) (မြန်မာ)', '+95', 'mm'], ['Namibia (Namibië)', '+264', 'na'],
  ['Nauru', '+674', 'nr'], ['Netherlands (Nederland)', '+31', 'nl'], ['New Caledonia (Nouvelle-Calédonie)', '+687', 'nc'],
  ['New Zealand', '+64', 'nz'], ['Nicaragua', '+505', 'ni'], ['Niger (Nijar)', '+227', 'ne'], ['Niue', '+683', 'nu'],
  ['Norfolk Island', '+672', 'nf'], ['North Korea (조선 민주주의 인민 공화국)', '+850', 'kp'],
  ['Northern Mariana Islands', '+1', 'mp'], ['Norway (Norge)', '+47', 'no'], ['Oman (‫عُمان‬‎)', '+968', 'om'],
  ['Palau', '+680', 'pw'], ['Palestine (‫فلسطين‬‎)', '+970', 'ps'], ['Panama (Panamá)', '+507', 'pa'],
  ['Papua New Guinea', '+675', 'pg'], ['Paraguay', '+595', 'py'], ['Peru (Perú)', '+51', 'pe'], ['Pitcairn Islands', '+64', 'pn'],
  ['Poland (Polska)', '+48', 'pl'], ['Portugal', '+351', 'pt'], ['Puerto Rico', '+1', 'pr'], ['Qatar (‫قطر‬‎)', '+974', 'qa'],
  ['Réunion (La Réunion)', '+262', 're'], ['Romania (România)', '+40', 'ro'], ['Russia (Россия)', '+7', 'ru'],
  ['Rwanda', '+250', 'rw'], ['Saint Barthélemy (Saint-Barthélemy)', '+590', 'bl'], ['Saint Helena', '+290', 'sh'],
  ['Saint Kitts and Nevis', '+1', 'kn'], ['Saint Lucia', '+1', 'lc'], ['Saint Martin (Saint-Martin (partie française))', '+590', 'mf'],
  ['Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)', '+508', 'pm'],
  ['Saint Vincent and the Grenadines', '+1', 'vc'], ['Samoa', '+685', 'ws'], ['San Marino', '+378', 'sm'],
  ['São Tomé and Príncipe (São Tomé e Príncipe)', '+239', 'st'], ['Saudi Arabia (‫المملكة العربية السعودية‬‎)', '+966', 'sa'],
  ['Senegal (Sénégal)', '+221', 'sn'], ['Serbia (Србија)', '+381', 'rs'], ['Seychelles', '+248', 'sc'],
  ['Sierra Leone', '+232', 'sl'], ['Singapore', '+65', 'sg'], ['Sint Maarten', '+1', 'sx'], ['Slovakia (Slovensko)', '+421', 'sk'],
  ['Slovenia (Slovenija)', '+386', 'si'], ['Solomon Islands', '+677', 'sb'], ['South Korea (대한민국)', '+82', 'kr'],
  ['South Sudan (‫جنوب السودان‬‎)', '+211', 'ss'], ['Spain (España)', '+34', 'es'], ['Sudan (‫السودان‬‎)', '+249', 'sd'],
  ['Suriname', '+597', 'sr'], ['Svalbard and Jan Mayen (Svalbard og Jan Mayen)', '+47', 'sj'], ['Swaziland', '+268', 'sz'],
  ['Sweden (Sverige)', '+46', 'se'], ['Switzerland (Schweiz)', '+41', 'ch'], ['Syria (‫سوريا‬‎)', '+963', 'sy'],
  ['Taiwan (台灣)', '+886', 'tw'], ['Tajikistan', '+992', 'tj'], ['Thailand (ไทย)', '+66', 'th'], ['Timor-Leste', '+670', 'tl'],
  ['Togo', '+228', 'tg'], ['Tokelau', '+690', 'tk'], ['Tonga', '+676', 'to'], ['Trinidad and Tobago', '+1', 'tt'],
  ['Tunisia (‫تونس‬‎)', '+216', 'tn'], ['Turkey (Türkiye)', '+90', 'tr'], ['Turkmenistan', '+993', 'tm'],
  ['Turks and Caicos Islands', '+1', 'tc'], ['Tuvalu', '+688', 'tv'], ['Uganda', '+256', 'ug'],
  ['Ukraine (Україна)', '+380', 'ua'], ['United Arab Emirates (‫الإمارات العربية المتحدة‬‎)', '+971', 'ae'],
  ['United Kingdom', '+44', 'gb'], ['United States', '+1', 'us'], ['U.S. Virgin Islands', '+1', 'vi'],
  ['Uruguay', '+598', 'uy'], ['Uzbekistan (Oʻzbekiston)', '+998', 'uz'], ['Vanuatu', '+678', 'vu'],
  ['Vatican City (Città del Vaticano)', '+39', 'va'], ['Venezuela', '+58', 've'], ['Wallis and Futuna', '+681', 'wf'],
  ['Western Sahara (‫الصحراء الغربية‬‎)', '+212', 'eh'], ['Yemen (‫اليمن‬‎)', '+967', 'ye'], ['Zambia', '+260', 'zm'], ['Zimbabwe', '+263', 'zw'],
];

// "Kenya" from "Kenya", "India" from "India (भारत)" — the plain part of the label.
export function countryBaseName(label) {
  const idx = label.indexOf(' (');
  return idx > 0 ? label.slice(0, idx) : label;
}

// Flag asset for a country entry (locally bundled, /assets/flags/<iso>.svg).
export function countryFlag(iso) {
  return iso ? `/assets/flags/${iso}.svg` : '';
}

// Look up a country entry by its stored label ("India (भारत)").
export function findCountry(label) {
  return COUNTRIES.find(([l]) => l === label) || null;
}
