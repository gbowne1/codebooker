const locationOptions = [
    { value: 'United States', label: 'United States', countryCode: 'US' },
    {
        value: 'Afghanistan',
        label: 'Afghanistan',
        countryCode: 'AF',
    },
    {
        value: 'Åland Islands',
        label: 'Åland Islands',
        countryCode: 'AX',
    },
    {
        value: 'Albania',
        label: 'Albania',
        countryCode: 'AL',
    },
    {
        value: 'Algeria',
        label: 'Algeria',
        countryCode: 'DZ',
    },
    {
        value: 'American Samoa',
        label: 'American Samoa',
        countryCode: 'AS',
    },
    {
        value: 'Andorra',
        label: 'Andorra',
        countryCode: 'AD',
    },
    {
        value: 'Angola',
        label: 'Angola',
        countryCode: 'AO',
    },
    {
        value: 'Anguilla',
        label: 'Anguilla',
        countryCode: 'AI',
    },
    {
        value: 'Antarctica',
        label: 'Antarctica',
        countryCode: 'AQ',
    },
    {
        value: 'Antigua and Barbuda',
        label: 'Antigua and Barbuda',
        countryCode: 'AG',
    },
    { value: 'Argentina', label: 'Argentina', countryCode: 'AR' },
    { value: 'Armenia', label: 'Armenia', countryCode: 'AM' },
    { value: 'Aruba', label: 'Aruba', countryCode: 'AW' },
    { value: 'Australia', label: 'Australia', countryCode: 'AU' },
    { value: 'Austria', label: 'Austria', countryCode: 'AT' },
    { value: 'Azerbaijan', label: 'Azerbaijan', countryCode: 'AZ' },
    { value: 'Bahamas', label: 'Bahamas', countryCode: 'BS' },
    { value: 'Bahrain', label: 'Bahrain', countryCode: 'BH' },
    { value: 'Barbados', label: 'Barbados', countryCode: 'BB' },
    { value: 'Belarus', label: 'Belarus', countryCode: 'BY' },
    {
        value: 'Belgium',
        label: 'Belgium',
        countryCode: 'BE',
    },
    {
        value: 'Belize',
        label: 'Belize',
        countryCode: 'BZ',
    },
    {
        value: 'Benin',
        label: 'Benin',
        countryCode: 'BJ',
    },
    {
        value: 'Bemurda',
        label: 'Bemurda',
        countryCode: 'BM',
    },
    {
        value: 'Bhutan',
        label: 'Bhutan',
        countryCode: 'BT',
    },
    {
        value: 'Bolivia',
        label: 'Bolivia',
        countryCode: 'BO',
    },
    {
        value: 'Bonaire, Saint Eustatius and Saba',
        label: 'Bonaire, Saint Eustatius and Saba',
        countryCode: 'BQ',
    },
    {
        value: 'Bosnia and Herzegovina',
        label: 'Bosnia and Herzegovina',
        countryCode: 'BA',
    },
    {
        value: 'Botswana',
        label: 'Botswana',
        countryCode: 'BW',
    },
    {
        value: 'Brazil',
        label: 'Brazil',
        countryCode: 'BR',
    },
    {
        value: 'British Indian Ocean Territory',
        label: 'British Indian Ocean Territory',
        countryCode: 'IO',
    },
    {
        value: 'Brunei Darusalam',
        label: 'Brunei Darusalam',
        countryCode: 'BN',
    },
    {
        value: 'Bangladesh',
        label: 'Bangladesh',
        countryCode: 'BD',
    },
    {
        value: 'Bulgaria',
        label: 'Bulgaria',
        countryCode: 'BG',
    },
    {
        value: 'Burkina Faso',
        label: 'Burkina Faso',
        countryCode: 'BF',
    },
    {
        value: 'Burundi',
        label: 'Burundi',
        countryCode: 'BI',
    },
    {
        value: 'Cambodia',
        label: 'Cambodia',
        countryCode: 'KH',
    },
    {
        value: 'Cameroon',
        label: 'Cameroon',
        countryCode: 'CM',
    },
    {
        value: 'Canada',
        label: 'Canada',
        countryCode: 'CA',
    },
    {
        value: 'Cape Verde',
        label: 'Cape Verde',
        countryCode: 'CV',
    },
    {
        value: 'Cayman Islands',
        label: 'Cayman Islands',
        countryCode: 'KY',
    },
    {
        value: 'Central African Republic',
        label: 'Central African Republic',
        countryCode: 'CF',
    },
    {
        value: 'Chad',
        label: 'Chad',
        countryCode: 'TD',
    },
    {
        value: 'Chile',
        label: 'Chile',
        countryCode: 'CL',
    },
    {
        value: 'China',
        label: 'China',
        countryCode: 'CN',
    },
    {
        value: 'Chrismas Island',
        label: 'Chrismas Island',
        countryCode: 'CX',
    },
    {
        value: 'Cocos (Keeling) Islands',
        label: 'Cocos (Keeling) Islands',
        countryCode: 'CC',
    },
    {
        value: 'Colombia',
        label: 'Colombia',
        countryCode: 'CO',
    },
    {
        value: 'Comoros',
        label: 'Comoros',
        countryCode: 'KM',
    },
    {
        value: 'Congo',
        label: 'Congo',
        countryCode: 'CG',
    },
    {
        value: 'Cook Island',
        label: 'Cook Island',
        countryCode: 'CK',
    },
    {
        value: 'Costa Rica',
        label: 'Costa Rica',
        countryCode: 'CR',
    },
    {
        value: 'Cote dlvoire',
        label: 'Cote dlvoire',
        countryCode: 'CI',
    },
    {
        value: 'Croatia',
        label: 'Croatia',
        countryCode: 'HR',
    },
    {
        value: 'Cuba',
        label: 'Cuba',
        countryCode: 'CU',
    },
    {
        value: 'Curacao',
        label: 'Curacao',
        countryCode: 'CW',
    },
    {
        value: 'Cyprus',
        label: 'Cyprus',
        countryCode: 'CY',
    },
    {
        value: 'Czech Republic',
        label: 'Czech Republic',
        countryCode: 'CZ',
    },
    {
        value: 'Denmark',
        label: 'Denmark',
        countryCode: 'DK',
    },
    {
        value: 'Djibouti',
        label: 'Djibouti',
        countryCode: 'DJ',
    },
    {
        value: 'Dominica',
        label: 'Dominica',
        countryCode: 'DM',
    },
    {
        value: 'Dominican Republic',
        label: 'Dominican Republic',
        countryCode: 'DO',
    },
    {
        value: 'Ecuador',
        label: 'Ecuador',
        countryCode: 'EC',
    },
    {
        value: 'Egypt',
        label: 'Egypt',
        countryCode: 'EG',
    },
    {
        value: 'El Salvador',
        label: 'El Salvador',
        countryCode: 'SV',
    },
    {
        value: 'Equatorial Guinea',
        label: 'Equatorial Guinea',
        countryCode: 'GQ',
    },
    {
        value: 'Eritrea',
        label: 'Eritrea',
        countryCode: 'ER',
    },
    {
        value: 'Estonia',
        label: 'Estonia',
        countryCode: 'EE',
    },
    {
        value: 'Ethiopia',
        label: 'Ethiopia',
        countryCode: 'ET',
    },
    {
        value: 'Falkland Islands (Malvinas)',
        label: 'Falkland Islands (Malvinas)',
        countryCode: 'FK',
    },
    {
        value: 'Faroe Islands',
        label: 'Faroe Islands',
        countryCode: 'FO',
    },
    {
        value: 'Fiji',
        label: 'Fiji',
        countryCode: 'FJ',
    },
    {
        value: 'Finland',
        label: 'Finland',
        countryCode: 'FI',
    },
    {
        value: 'France',
        label: 'France',
        countryCode: 'FR',
    },
    {
        value: 'French Guiana',
        label: 'French Guiana',
        countryCode: 'GF',
    },
    {
        value: 'French Polynesia',
        label: 'French Polynesia',
        countryCode: 'PF',
    },
    {
        value: 'French Southern Territories',
        label: 'French Southern Territories',
        countryCode: 'TF',
    },
    {
        value: 'Gabon',
        label: 'Gabon',
        countryCode: 'GA',
    },
    {
        value: 'Gambia',
        label: 'Gambia',
        countryCode: 'GM',
    },
    {
        value: 'Georgia',
        label: 'Georgia',
        countryCode: 'GE',
    },
    {
        value: 'Germany',
        label: 'Germany',
        countryCode: 'DE',
    },
    {
        value: 'Ghana',
        label: 'Ghana',
        countryCode: 'GH',
    },
    {
        value: 'Gibraltar',
        label: 'Gibraltar',
        countryCode: 'GI',
    },
    {
        value: 'Greece',
        label: 'Greece',
        countryCode: 'GR',
    },
    {
        value: 'Greenland',
        label: 'Greenland',
        countryCode: 'GL',
    },
    {
        value: 'Grenada',
        label: 'Grenada',
        countryCode: 'GD',
    },
    {
        value: 'Guadeloupe',
        label: 'Guadeloupe',
        countryCode: 'GP',
    },
    {
        value: 'Guam',
        label: 'Guam',
        countryCode: 'GU',
    },
    {
        value: 'Guatemala',
        label: 'Guatemala',
        countryCode: 'GT',
    },
    {
        value: 'Guernsey',
        label: 'Guernsey',
        countryCode: 'GG',
    },
    {
        value: 'Guinea',
        label: 'Guinea',
        countryCode: 'GN',
    },
    {
        value: 'Guinea-Bissau',
        label: 'Guinea-Bissau',
        countryCode: 'GW',
    },
    {
        value: 'Guyana',
        label: 'Guyana',
        countryCode: 'GY',
    },
    {
        value: 'Haiti',
        label: 'Haiti',
        countryCode: 'HT',
    },
    {
        value: 'Holy See (Vatican City State)',
        label: 'Holy See (Vatican City State)',
        countryCode: 'VA',
    },
    {
        value: 'Honduras',
        label: 'Honduras',
        countryCode: 'HN',
    },
    {
        value: 'Hong Kong SAR of China',
        label: 'Hong Kong SAR of China',
        countryCode: 'HK',
    },
    {
        value: 'Hungary',
        label: 'Hungary',
        countryCode: 'HU',
    },
    {
        value: 'Iceland',
        label: 'Iceland',
        countryCode: 'IS',
    },
    {
        value: 'India',
        label: 'India',
        countryCode: 'IN',
    },
    {
        value: 'Indonesia',
        label: 'Indonesia',
        countryCode: 'ID',
    },
    {
        value: 'Iran, Islamic Republic of',
        label: 'Iran, Islamic Republic of',
        countryCode: 'IR',
    },
    {
        value: 'Iraq',
        label: 'Iraq',
        countryCode: 'IQ',
    },
    {
        value: 'Ireland',
        label: 'Ireland',
        countryCode: 'IE',
    },
    {
        value: 'Isle of Man',
        label: 'Isle of Man',
        countryCode: 'IM',
    },
    {
        value: 'Israel',
        label: 'Israel',
        countryCode: 'IL',
    },
    {
        value: 'Italy',
        label: 'Italy',
        countryCode: 'IT',
    },
    {
        value: 'Jamaica',
        label: 'Jamaica',
        countryCode: 'JM',
    },
    {
        value: 'Japan',
        label: 'Japan',
        countryCode: 'JP',
    },
    {
        value: 'Jersey',
        label: 'Jersey',
        countryCode: 'JE',
    },
    {
        value: 'Jordan',
        label: 'Jordan',
        countryCode: 'JO',
    },
    {
        value: 'Kazakhstan',
        label: 'Kazakhstan',
        countryCode: 'KZ',
    },
    {
        value: 'Kenya',
        label: 'Kenya',
        countryCode: 'KE',
    },
    {
        value: 'Kiribati',
        label: 'Kiribati',
        countryCode: 'KI',
    },
    {
        value: 'Korea, Democratic Peoples Republic of',
        label: 'Korea, Democratic Peoples Republic of',
        countryCode: 'KP',
    },
    {
        value: 'Korea, Republic of',
        label: 'Korea, Republic of',
        countryCode: 'KR',
    },
    {
        value: 'Kosovo',
        label: 'Kosovo',
        countryCode: 'XK',
    },
    {
        value: 'Kuwait',
        label: 'Kuwait',
        countryCode: 'KW',
    },
    {
        value: 'Kyrgyzstan',
        label: 'Kyrgyzstan',
        countryCode: 'KG',
    },
    {
        value: 'Lao Peoples Democratic Republic',
        label: 'Lao Peoples Democratic Republic',
        countryCode: 'LA',
    },
    {
        value: 'Latvia',
        label: 'Latvia',
        countryCode: 'LV',
    },
    {
        value: 'Lebanon',
        label: 'Lebanon',
        countryCode: 'LB',
    },
    {
        value: 'Lesotho',
        label: 'Lesotho',
        countryCode: 'LS',
    },
    {
        value: 'Liberia',
        label: 'Liberia',
        countryCode: 'LR',
    },
    {
        value: 'Libya',
        label: 'Libya',
        countryCode: 'LY',
    },
    {
        value: 'Liechtenstein',
        label: 'Liechtenstein',
        countryCode: 'LI',
    },
    {
        value: 'Lithuania',
        label: 'Lithuania',
        countryCode: 'LT',
    },
    {
        value: 'Luxembourg',
        label: 'Luxembourg',
        countryCode: 'LU',
    },
    {
        value: 'Macau SAR of China',
        label: 'Macau SAR of China',
        countryCode: 'MO',
    },
    {
        value: 'Madagascar',
        label: 'Madagascar',
        countryCode: 'MG',
    },
    {
        value: 'Malawi',
        label: 'Malawi',
        countryCode: 'MW',
    },
    {
        value: 'Malaysia',
        label: 'Malaysia',
        countryCode: 'MY',
    },
    {
        value: 'Maldives',
        label: 'Maldives',
        countryCode: 'MV',
    },
    {
        value: 'Mali',
        label: 'Mali',
        countryCode: 'ML',
    },
    {
        value: 'Malta',
        label: 'Malta',
        countryCode: 'MT',
    },
    {
        value: 'Marshall Islands',
        label: 'Marshall Islands',
        countryCode: 'MH',
    },
    {
        value: 'Martinique',
        label: 'Martinique',
        countryCode: 'MQ',
    },
    {
        value: 'Mauritania',
        label: 'Mauritania',
        countryCode: 'MR',
    },
    {
        value: 'Mauritius',
        label: 'Mauritius',
        countryCode: 'MU',
    },
    {
        value: 'Mayotte',
        label: 'Mayotte',
        countryCode: 'YT',
    },
    {
        value: 'Mexico',
        label: 'Mexico',
        countryCode: 'MX',
    },
    {
        value: 'Micronesia Federated State of',
        label: 'Micronesia Federated State of',
        countryCode: 'FM',
    },
    {
        value: 'Moldova, Republic of',
        label: 'Moldova, Republic of',
        countryCode: 'MD',
    },
    {
        value: 'Monaco',
        label: 'Monaco',
        countryCode: 'MC',
    },
    {
        value: 'Mongolia',
        label: 'Mongolia',
        countryCode: 'MN',
    },
    {
        value: 'Montenegro',
        label: 'Montenegro',
        countryCode: 'ME',
    },
    {
        value: 'Montserrat',
        label: 'Montserrat',
        countryCode: 'MS',
    },
    {
        value: 'Morocco',
        label: 'Morocco',
        countryCode: 'MA',
    },
    {
        value: 'Mozambique',
        label: 'Mozambique',
        countryCode: 'MZ',
    },
    {
        value: 'Myanmar',
        label: 'Myanmar',
        countryCode: 'MM',
    },
    {
        value: 'Namibia',
        label: 'Namibia',
        countryCode: 'NA',
    },
    {
        value: 'Nauru',
        label: 'Nauru',
        countryCode: 'NR',
    },
    {
        value: 'Nepal',
        label: 'Nepal',
        countryCode: 'NP',
    },
    {
        value: 'Netherlands',
        label: 'Netherlands',
        countryCode: 'NL',
    },
    {
        value: 'New Caledonia',
        label: 'New Caledonia',
        countryCode: 'NC',
    },
    {
        value: 'New Zealand',
        label: 'New Zealand',
        countryCode: 'NZ',
    },
    {
        value: 'Nicaragua',
        label: 'Nicaragua',
        countryCode: 'NI',
    },
    {
        value: 'Niger',
        label: 'Niger',
        countryCode: 'NE',
    },
    {
        value: 'Nigeria',
        label: 'Nigeria',
        countryCode: 'NG',
    },
    {
        value: 'Niue',
        label: 'Niue',
        countryCode: 'NU',
    },
    {
        value: 'Norfolk Island',
        label: 'Norfolk Island',
        countryCode: 'NF',
    },
    {
        value: 'North Macedonia',
        label: 'North Macedonia',
        countryCode: 'MK',
    },
    {
        value: 'Northern Mariana Islands',
        label: 'Northern Mariana Islands',
        countryCode: 'MP',
    },
    {
        value: 'Norway',
        label: 'Norway',
        countryCode: 'NO',
    },
    {
        value: 'Oman',
        label: 'Oman',
        countryCode: 'OM',
    },
    {
        value: 'Pakistan',
        label: 'Pakistan',
        countryCode: 'PK',
    },
    {
        value: 'Palau',
        label: 'Palau',
        countryCode: 'PW',
    },
    {
        value: 'Palestinian Territory',
        label: 'Palestinian Territory',
        countryCode: 'PS',
    },
    {
        value: 'Panama',
        label: 'Panama',
        countryCode: 'PA',
    },
    {
        value: 'Papua New Guinea',
        label: 'Papua New Guinea',
        countryCode: 'PG',
    },
    {
        value: 'Paraguay',
        label: 'Paraguay',
        countryCode: 'PY',
    },
    {
        value: 'Peru',
        label: 'Peru',
        countryCode: 'PE',
    },
    {
        value: 'Philipines',
        label: 'Philipines',
        countryCode: 'PH',
    },
    {
        value: 'Pitcairn',
        label: 'Pitcairn',
        countryCode: 'PN',
    },
    {
        value: 'Poland',
        label: 'Poland',
        countryCode: 'PL',
    },
    {
        value: 'Portugal',
        label: 'Portugal',
        countryCode: 'PT',
    },
    {
        value: 'Puerto Rico',
        label: 'Puerto Rico',
        countryCode: 'PR',
    },
    {
        value: 'Qatar',
        label: 'Qatar',
        countryCode: 'QA',
    },
    {
        value: 'Reunion',
        label: 'Reunion',
        countryCode: 'RE',
    },
    {
        value: 'Romania',
        label: 'Romania',
        countryCode: 'RO',
    },
    {
        value: 'Russian Federation',
        label: 'Russian Federation',
        countryCode: 'RU',
    },
    {
        value: 'Rwanda',
        label: 'Rwanda',
        countryCode: 'RW',
    },
    {
        value: 'Saint Bartelemey',
        label: 'Saint Bartelemey',
        countryCode: 'BL',
    },
    {
        value: 'Saint Helena',
        label: 'Saint Helena',
        countryCode: 'SH',
    },
    {
        value: 'Saint Kitts and Nevis',
        label: 'Saint Kitts and Nevis',
        countryCode: 'KN',
    },
    {
        value: 'Saint Martin',
        label: 'Saint Martin',
        countryCode: 'MF',
    },
    {
        value: 'Saint Pierre and Miquelon',
        label: 'Saint Pierre and Miquelon',
        countryCode: 'PM',
    },
    {
        value: 'Saint Vincent and the Grenadines',
        label: 'Saint Vincent and the Grenadines',
        countryCode: 'VC',
    },
    {
        value: 'Samoa',
        label: 'Samoa',
        countryCode: 'WS',
    },
    {
        value: 'San Marino',
        label: 'San Marino',
        countryCode: 'SM',
    },
    {
        value: 'Sao Tome and Principe',
        label: 'Sao Tome and Principe',
        countryCode: 'ST',
    },
    {
        value: 'Senegal',
        label: 'Senegal',
        countryCode: 'SN',
    },
    {
        value: 'Serbia',
        label: 'Serbia',
        countryCode: 'RS',
    },
    {
        value: 'Seychelles',
        label: 'Seychelles',
        countryCode: 'SC',
    },
    {
        value: 'Sierra Leone',
        label: 'Sierra Leone',
        countryCode: 'SL',
    },
    {
        value: 'Singapore',
        label: 'Singapore',
        countryCode: 'SG',
    },
    {
        value: 'Sint Maarten',
        label: 'Sint Maarten',
        countryCode: 'SX',
    },
    {
        value: 'Saint Lucia',
        label: 'Saint Lucia',
        countryCode: 'LC',
    },
    {
        value: 'Saudi Arabia',
        label: 'Saudi Arabia',
        countryCode: 'SA',
    },
    {
        value: 'Thailand',
        label: 'Thailand',
        countryCode: 'TH',
    },
    {
        value: 'Timor-Leste',
        label: 'Timor-Leste',
        countryCode: 'TL',
    },
    {
        value: 'Togo',
        label: 'Togo',
        countryCode: 'TG',
    },
    {
        value: 'Tokelau',
        label: 'Tokelau',
        countryCode: 'TK',
    },
    {
        value: 'Tonga',
        label: 'Tonga',
        countryCode: 'TO',
    },
    {
        value: 'Trinidad and Tobago',
        label: 'Trinidad and Tobago',
        countryCode: 'TT',
    },
    {
        value: 'Tunisia',
        label: 'Tunisia',
        countryCode: 'TN',
    },
    {
        value: 'Turkey',
        label: 'Turkey',
        countryCode: 'TR',
    },
    {
        value: 'Turkmenistan',
        label: 'Turkmenistan',
        countryCode: 'TM',
    },
    {
        value: 'Turks and Caicos Islands',
        label: 'Turks and Caicos Islands',
        countryCode: 'TC',
    },
    {
        value: 'Tuvalu',
        label: 'Tuvalu',
        countryCode: 'TV',
    },
    {
        value: 'Uganda',
        label: 'Uganda',
        countryCode: 'UG',
    },
    {
        value: 'Ukraine',
        label: 'Ukraine',
        countryCode: 'UA',
    },
    {
        value: 'United Arab Emirates',
        label: 'United Arab Emirates',
        countryCode: 'AE',
    },
    {
        value: 'United Kingdom',
        label: 'United Kingdom',
        countryCode: 'GB',
    },
    {
        value: 'United States Minor Outlying Islands',
        label: 'United States Minor Outlying Islands',
        countryCode: 'UM',
    },
    {
        value: 'Uruguay',
        label: 'Uruguay',
        countryCode: 'UY',
    },
    {
        value: 'Uzbekistan',
        label: 'Uzbekistan',
        countryCode: 'UZ',
    },
    {
        value: 'Vanuatu',
        label: 'Vanuatu',
        countryCode: 'VU',
    },
    {
        value: 'Venezuela',
        label: 'Venezuela',
        countryCode: 'VE',
    },
    {
        value: 'Vietnam',
        label: 'Vietnam',
        countryCode: 'VN',
    },
    {
        value: 'Virgin Islands, British',
        label: 'Virgin Islands, British',
        countryCode: 'VG',
    },
    {
        value: 'Virgin Islands U.S.',
        label: 'Virgin Islands U.S.',
        countryCode: 'VI',
    },
    {
        value: 'Wallis and Futuna',
        label: 'Wallis and Futuna',
        countryCode: 'WF',
    },
    {
        value: 'Western Sahara',
        label: 'Western Sahara',
        countryCode: 'EH',
    },
    {
        value: 'Yemen',
        label: 'Yemen',
        countryCode: 'YE',
    },
    {
        value: 'Zambia',
        label: 'Zambia',
        countryCode: 'ZM',
    },
    {
        value: 'Zimbabwe',
        label: 'Zimbabwe',
        countryCode: 'ZW',
    },
];
export default locationOptions;
