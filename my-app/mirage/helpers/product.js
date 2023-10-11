import { faker } from '@faker-js/faker';

export const categoryIds = [
  'bacon',
  'balloon',
  'cake',
  'chair',
  'fish',
  'gloves',
  'hat',
  'mug',
  'pants',
  'pasta',
  'pizza',
  'sausages',
  'shoes',
  'soap',
  'towel',
];

const imageIds = {
  bacon: [
    '1927377',
    '139746',
    '660282',
    '166031',
    '1833336',
    '2983099',
    '551997',
    '101533',
    '2961957',
    '3052362',
    '3326112',
    '2762942',
    '2272037',
    '1861787',
    '434283',
    '1412010',
    '1930760',
    '144432',
    '1833337',
    '2097090',
    '751798',
    '2935022',
    '3070970',
    '263070',
    '1861785',
    '2739268',
    '3138578',
    '3052366',
    '59943',
  ],

  balloon: [
    '574282',
    '772478',
    '618609',
    '907274',
    '887824',
    '1030927',
    '234196',
    '226737',
    '1165869',
    '2397361',
    '1313814',
    '207241',
    '704748',
    '2418645',
    '68806',
    '2534579',
    '1391580',
    '796606',
    '210012',
    '1277109',
    '1334786',
    '325812',
    '1620784',
    '1740103',
    '1441024',
  ],

  cake: [
    '291528',
    '1055272',
    '1070850',
    '264892',
    '1702373',
    '302561',
    '913136',
    '227432',
    '853004',
    '1854652',
    '1038711',
    '1055271',
    '159887',
    '1098592',
    '433527',
    '132694',
    '1721934',
    '1028714',
    '1070896',
    '140831',
    '369267',
    '1414234',
    '1055270',
    '1721932',
    '1126359',
    '806363',
    '954199',
  ],

  chair: [
    '963486',
    '1701100',
    '696407',
    '2082090',
    '910625',
    '509922',
    '96940',
    '769585',
    '289445',
    '1957477',
    '276534',
    '116148',
    '2180883',
    '280471',
    '1366872',
    '1148955',
    '116910',
    '1321290',
    '105004',
    '116907',
    '1350789',
    '54539',
    '1766485',
    '106839',
    '116915',
    '447592',
    '1080696',
    '1029796',
    '1366875',
  ],

  fish: [
    '3606800',
    '842142',
    '248444',
    '1516415',
    '628776',
    '2570976',
    '858501',
    '858508',
    '3338537',
    '684965',
    '1422384',
    '3298063',
    '1148087',
    '3304057',
    '688803',
    '1028427',
    '2570973',
    '1199985',
    '2098134',
    '1123249',
    '3296587',
    '539430',
    '325044',
    '2323391',
    '1247676',
    '3338542',
    '3490367',
    '3338496',
    '343812',
    '858496',
    '1028429',
    '3590401',
    '262959',
    '725991',
    '2323398',
    '566345',
    '262945',
    '2098143',
    '428355',
    '1683545',
    '2374946',
    '2570975',
    '3298065',
    '676560',
    '2264036',
    '3596694',
    '1030960',
    '3298180',
    '684964',
    '1618873',
    '3298182',
    '359992',
    '2570974',
    '3504874',
    '1199982',
    '3296543',
    '836850',
    '3338500',
    '3296544',
    '1199973',
  ],

  gloves: [
    '63448',
    '735307',
    '209230',
    '2280571',
    '2280568',
    '209271',
    '2254028',
    '361754',
    '258303',
    '1659747',
    '207601',
    '286625',
    '669585',
    '45057',
    '978808',
    '1251196',
    '54200',
    '1350560',
    '585419',
    '1620653',
    '1659749',
    '700535',
    '2280551',
    '54204',
    '704217',
    '1903760',
    '669578',
    '242829',
  ],

  hat: [
    '984619',
    '674268',
    '792535',
    '845457',
    '67603',
    '1878821',
    '601168',
    '906002',
    '1263986',
    '2224699',
    '2613260',
    '1398560',
    '1066881',
    '1036627',
    '1382734',
    '1687719',
    '1078975',
    '458649',
    '744365',
    '242149',
    '1261422',
    '936038',
    '1070058',
    '871060',
    '997750',
    '1001851',
    '1229942',
    '1079783',
  ],

  mug: [
    '606542',
    '1207918',
    '1566308',
    '1421177',
    '1239403',
    '704813',
    '1925534',
    '851555',
    '1187317',
    '209500',
    '606543',
    '272887',
    '894609',
    '1749303',
    '939833',
    '1239422',
    '1755215',
    '585753',
    '894608',
    '322338',
    '265186',
    '1477851',
    '891252',
    '641038',
    '1790965',
    '1001990',
    '714093',
    '414645',
  ],

  pants: [
    '1598507',
    '346749',
    '818992',
    '792762',
    '270968',
    '914668',
    '2700537',
    '1564149',
    '2254119',
    '217860',
    '663437',
    '1042140',
    '2421374',
    '1999705',
    '1082529',
    '1082528',
    '1649896',
    '1082526',
    '934070',
    '450059',
    '1450114',
    '2280342',
    '663455',
    '3608205',
    '1546694',
  ],

  pasta: [
    '1437267',
    '1487511',
    '803963',
    '1256875',
    '1460872',
    '769969',
    '116738',
    '1527603',
    '226004',
    '159987',
    '1437631',
    '2703468',
    '546945',
    '1435898',
    '128408',
    '2433979',
    '745369',
    '921374',
    '209569',
    '862949',
    '989708',
    '2059191',
    '2412950',
    '154145',
    '1440391',
    '1279330',
    '1398688',
    '1438672',
    '1373915',
    '327143',
    '262905',
    '2059193',
    '989690',
    '2092906',
    '64208',
    '725990',
    '1435896',
    '55636',
    '691114',
    '2204771',
    '1224226',
    '1087906',
    '1150447',
    '3590401',
    '2059192',
    '688804',
    '725997',
  ],

  pizza: [
    '708587',
    '905847',
    '803290',
    '315755',
    '280453',
    '2147491',
    '1082343',
    '774487',
    '2271194',
    '1596884',
    '365459',
    '262967',
    '1301945',
    '262977',
    '1049626',
    '1653877',
    '1596888',
    '1260968',
    '825661',
    '1566837',
    '208537',
    '263041',
    '2619967',
    '1253737',
    '1435907',
    '1146760',
    '166451',
    '842519',
    '1653772',
    '2180875',
  ],

  sausages: [
    '929137',
    '1857732',
    '96619',
    '1556696',
    '2901854',
    '1857730',
    '1481284',
    '128641',
    '3569890',
    '1857729',
    '96618',
    '605624',
    '3341986',
    '3619859',
    '357576',
    '533325',
    '2126578',
    '1038515',
    '1857728',
    '1233101',
    '116726',
    '2422444',
    '53626',
    '605626',
  ],

  shoes: [
    '336372',
    '1335463',
    '1661470',
    '1630344',
    '267202',
    '2529148',
    '786003',
    '637076',
    '977908',
    '1478442',
    '2285500',
    '2048548',
    '1032110',
    '1240892',
    '1280064',
    '609771',
    '1598505',
    '2065695',
    '1598508',
    '1027130',
    '267320',
    '318236',
    '292999',
    '1554613',
    '1909015',
    '1102777',
    '1306248',
    '1858407',
    '298863',
  ],

  soap: [
    '773252',
    '208483',
    '235842',
    '433624',
    '1460839',
    '374847',
    '2566853',
    '372810',
    '2547449',
    '1263985',
    '2736220',
    '545014',
    '206299',
    '545021',
    '1438489',
    '2611837',
    '1693653',
    '374911',
    '905186',
    '216794',
    '965990',
    '2796103',
    '210627',
    '374691',
    '3059615',
    '302743',
  ],

  towel: [
    '12679',
    '374071',
    '842950',
    '534116',
    '2462996',
    '965989',
    '2401109',
    '965990',
    '1239298',
    '374911',
    '2870724',
    '1809345',
    '3609985',
    '2180947',
    '2805353',
    '2672634',
    '45980',
    '374148',
    '534179',
    '3212164',
    '208483',
    '282892',
    '861166',
    '2373201',
    '3609986',
    '3115007',
    '531905',
    '1740749',
    '230128',
  ],
};

const names = {
  bacon: 'Bacon',
  balloon: 'Balloon',
  cake: 'Cake',
  chair: 'Chair',
  fish: 'Fish',
  gloves: 'Gloves',
  hat: 'Hat',
  mug: 'Mug',
  pants: 'Pants',
  pasta: 'Pasta',
  pizza: 'Pizza',
  sausages: 'Sausages',
  shoes: 'Shoes',
  soap: 'Soap',
  towel: 'Towel',
};

export function getImageUrl(categoryId) {
  if (!(categoryId in imageIds)) {
    throw new Error(`Unknown category id: ${categoryId}`);
  }

  const imageId = faker.helpers.arrayElement(imageIds[categoryId]);

  return `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256`;
}

export function getName(categoryId) {
  return names[categoryId];
}
