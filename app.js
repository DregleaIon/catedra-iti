const runtimeConfig = window.IT_SITE_CONFIG || {};
const { useEffect, useMemo, useRef, useState } = React;
const template = htm.bind(React.createElement);

const STORAGE_KEYS = {
  theme: 'it-catedra-theme',
  visitCount: 'it-catedra-visit-count',
  visitSessionFlag: 'it-catedra-visit-session'
};

const PAGE_DEFINITIONS = {
  home: {
    title: 'Catedra Informatică și Tehnologii Informaționale Universitatea Pedagocică de Stat „Ion Creangă”',
    subtitle:
      'Structură modernă pentru prezentarea catedrei, programelor de studii, profesorilor și activităților academice.'
  },
  despre: {
    title: 'Despre Catedră',
    subtitle:
      'Prezinți misiunea catedrei, direcțiile strategice, infrastructura și parteneriatele instituționale.'
  },
  profesori: {
    title: 'Echipa Didactică',
    subtitle:
      'Caută rapid cadrele didactice după rol, domeniu de expertiză și discipline predate.'
  },
  profesor: {
    title: 'Profil Profesor',
    subtitle: 'Pagină individuală pentru profil academic, discipline, cercetare și date de contact.'
  },
  studenti: {
    title: 'Viața Studențească',
    subtitle:
      'Programe de studii, calendar activități, oportunități și rezultate academice ale studenților.'
  },
  media: {
    title: 'Media și Galerie',
    subtitle:
      'Secțiune pentru materiale video, imagini de la evenimente și prezentări ale proiectelor.'
  },
  noutati: {
    title: 'Noutăți și Anunțuri',
    subtitle: 'Feed de noutăți academice, evenimente, anunțuri oficiale și actualizări periodice.'
  },
  tendinte: {
    title: 'Istoricul Catedrei',
    subtitle:
      'Istoria Catedrei ITI, activitatea științifico-didactică, direcțiile de cercetare și perspectivele de dezvoltare.'
  },
  contact: {
    title: 'Contact Catedra ITI',
    subtitle:
      'Date instituționale complete și formular demo pentru solicitări informative.'
  }
};

const DEFAULT_NAV_LINKS = [
  { key: 'home', href: 'index.html', label: 'Acasă' },
  { key: 'despre', href: 'despre.html', label: 'Despre' },
  { key: 'profesori', href: 'profesori.html', label: 'Profesori' },
  { key: 'studenti', href: 'studenti.html', label: 'Studenți' },
  { key: 'media', href: 'media.html', label: 'Media' },
  { key: 'noutati', href: 'noutati.html', label: 'Noutăți' },
  { key: 'tendinte', href: 'tendinte.html', label: 'Istoric' },
  { key: 'contact', href: 'contact.html', label: 'Contact' }
];

const NAV_LINKS =
  Array.isArray(runtimeConfig.navLinks) && runtimeConfig.navLinks.length > 0
    ? runtimeConfig.navLinks
    : DEFAULT_NAV_LINKS;

const IS_WORDPRESS_MODE = NAV_LINKS.some(
  (item) => typeof item.href === 'string' && item.href.includes('view=')
);

const departmentStats = [
  { value: '1930', label: 'Anul fondării UST', progress: '100%' },
  { value: '1940', label: 'Anul fondării UPSC', progress: '100%' },
  { value: '1985', label: 'Fondarea Catedrei ITI', progress: '100%' },
  { value: '8', label: 'Laboratoare moderne IT', progress: '100%' },
  { value: '1000+', label: 'Publicații științifice și didactice', progress: '100%' }
];

const TEACHER_DEFAULTS = Object.freeze({
  field: 'Informatică și Tehnologii Informaționale',
  subjects: 'Discipline: Programare, Tehnologii Web, Baze de date, Inteligență artificială',
  office: 'Str. Ghenadie Iablocikin 5, Chișinău',
  officeHours: 'Luni - Vineri, 09:00 - 16:00'
});

const TEACHER_ROSTER = [
  {
    name: 'Liubomir Chiriac',
    role: 'șef catedra ITI, dr. hab., prof. univ',
    email: 'chiriac.liubomir@upsc.md',
    bio: 'Șeful catedrei Informatică și Tehnologii Informaționale, doctor habilitat, profesor universitar.',
    researchTags: ['Informatică', 'Tehnologii Informaționale']
  },
  {
    name: 'Andrei Braicov',
    role: 'decan FMTI, dr., prof. univ',
    field: 'Matematică și Tehnologii Informaționale',
    email: 'braicov.andrei@upsc.md',
    bio: 'Decanul Facultății de Matematică și Tehnologii Informaționale, doctor, profesor universitar.',
    researchTags: ['Informatică', 'Management academic']
  },
  {
    name: 'Iulian Marcov',
    role: 'fondator catedrei ITI, dr., conf. univ',
    email: 'marcov.iulian@upsc.md',
    bio: 'Fondatorul catedrei Informatică și Tehnologii Informaționale, doctor, conferențiar universitar.',
    researchTags: ['Informatică', 'Educație digitală']
  },
  {
    name: 'Angela Globa',
    role: 'prorector, dr., conf. univ',
    email: 'globa.angela@upsc.md',
    photo: './fotografii/Angela Globa.jpg',
    bio: 'Prorector al universității, doctor, conferențiar universitar.',
    researchTags: ['Informatică', 'Management universitar']
  },
  { name: 'Ala Gașnaș', role: 'dr., conf. univ', email: 'gasnas.ala@upsc.md' },
  { name: 'Natalia Josu', role: 'dr., conf. univ', email: 'josu.natalia@upsc.md' },
  { name: 'Dorin Pavel', role: 'dr., conf. univ', email: 'pavel.dorin@upsc.md' },
  { name: 'Maria Pavel', role: 'dr., conf. univ', email: 'pavel.maria@upsc.md' },
  { name: 'Natalia Lupașco', role: 'dr., conf. univ', email: 'lupasco.natalia@upsc.md' },
  { name: 'Tatiana Veveriță', role: 'dr., conf. univ', email: 'veverita.tatiana@upsc.md' },
  { name: 'Inga Tițchiev', role: 'dr., conf. univ', email: 'titchiev.inga@upsc.md' },
  { name: 'Lilia Mihălache', role: 'dr., conf. univ', email: 'mihalache.lilia@upsc.md' },
  { name: 'Tatiana Chiriac', role: 'dr., conf. univ', email: 'chiriac.tatiana@upsc.md' },
  { name: 'Nicolae Balmuș', role: 'dr., conf. univ', email: 'balmus.nicolae@upsc.md' },
  { name: 'Teodora Vascan', role: 'dr., conf. univ', email: 'vascan.teodora@upsc.md' },
  { name: 'Violeta Bogdanova', role: 'dr., lector univ', email: 'bogdanova.violeta@upsc.md' },
  { name: 'Marina Bostan', role: 'lector univ', email: 'bostan.marina@upsc.md' },
  { name: 'Olesea Sîrghi', role: 'lector univ', email: 'sirghi.olesea@upsc.md' },
  { name: 'Olga Timuș', role: 'lector univ', email: 'timus.olga@upsc.md' },
  {
    name: 'Ion Martiniuc',
    role: 'specialist sup., inginer pr.',
    field: 'Inginerie software',
    subjects: '',
    email: 'martiniuc.ion@upsc.md',
    bio: 'Specialist superior, inginer în cadrul Catedrei ITI.',
    researchTags: ['Inginerie software']
  },
  {
    name: 'Pînzari Dumitru',
    role: 'inginer-programator',
    field: 'Dezvoltare software',
    subjects: '',
    email: 'pinzari.dumitru@upsc.md',
    researchTags: ['Programare']
  },
  {
    name: 'Pleșca Alexandrina',
    role: 'laborant sup.',
    field: 'Suport laborator',
    subjects: '',
    email: 'plesca.alexandrina@upsc.md',
    bio: 'Laborant superior în cadrul Catedrei ITI.',
    researchTags: ['Suport laborator']
  },
  {
    name: 'Nicoleta Zugravu',
    role: 'laborant sup.',
    field: 'Suport laborator',
    subjects: '',
    email: 'zugravu.nicoleta@upsc.md',
    bio: 'Laborant superior în cadrul Catedrei ITI.',
    researchTags: ['Suport laborator']
  }
];

const teacherProfiles = TEACHER_ROSTER.map((teacher, index) => ({
  id: `p${index + 1}`,
  ...TEACHER_DEFAULTS,
  achievements: [],
  publications: [],
  ...teacher,
  photo: teacher.photo || `./fotografii/${teacher.name}.png`,
  researchTags: teacher.researchTags ? [...teacher.researchTags] : ['Informatică'],
  bio: teacher.bio || `${teacher.role} în cadrul catedrei ITI.`
}));
const CV_FILES = {
  'Angela Globa': [{ label: 'Deschide CV', file: 'cvGloba  Angela 28.04.2026.pdf' }],
  'Ala Gașnaș': [{ label: 'Deschide CV', file: 'CV_Gasnas_Ala 2026_Catedra.pdf' }],
  'Lilia Mihălache': [{ label: 'Deschide CV', file: 'CV_Lilia_Mihălache.pdf' }],
  'Inga Tițchiev': [{ label: 'Deschide CV', file: 'CV_Titchiev_2026.pdf' }],
  'Tatiana Chiriac': [{ label: 'Deschide CV', file: 'CV_catedra_Chiriac Tatiana_aprilie 2026.pdf' }],
  'Olga Timuș': [{ label: 'Deschide CV', file: 'CV Timuș Olga.pdf' }],
  'Maria Pavel': [{ label: 'Deschide CV', file: 'Maria_Pavel_CV.pdf' }],
  'Nicolae Balmuș': [{ label: 'Deschide CV', file: 'balmus N.pdf' }],
  'Andrei Braicov': [{ label: 'Deschide CV', file: 'Braicov_CV_ITI.pdf' }],
  'Natalia Josu': [{ label: 'Deschide CV', file: 'CV_Natalia Josu.pdf' }],
  'Tatiana Veveriță': [{ label: 'Deschide CV', file: 'CV_Site_Veverita_Tatiana.pdf' }]
};

const STUDY_FILES = {
  ciclu1: [
    { label: 'Informatică', file: './ciclul1/Informatica_f.pdf' },
    { label: 'Informatică (frecvență redusă)', file: './ciclul1/invatamant%20cu%20frecventa%20redusa/Informatica_SE.pdf' },
    { label: 'Fizică și Informatică', file: './ciclul1/Fizica-si-Informatica.pdf' },
    { label: 'Matematică și Informatică', file: './ciclul1/Matematica-si-Informatica.pdf' },
    { label: 'Informatică (Word)', file: './ciclul1/Informatica.docx' }
  ],
  ciclu2: [
    { label: 'Inovații în Educație și Leadership Digital', file: './ciclul2/Inovatii-in-Educatie-si-Leadership-Digital.pdf' },
    { label: 'Tehnologii de creare (2021)', file: './ciclul2/studii_planrui_FFMTI_CII_Tehnologii_de_creare_120_2021.pdf' },
    { label: 'Tehnologii Informaționale în instruire (2021)', file: './ciclul2/studii_planuri_FFMTI_CII_TI_instruire_120_2021.pdf' },
    { label: 'TIC în instruire (2022)', file: './ciclul2/studii_planuri_FFMTI_TIC_instruire_120_2022.pdf' },
    { label: 'TIC în instruire — la distanță (2024)', file: './ciclul2/Programe%20de%20studii%20la%20distan%C8%9B%C4%83/studii_planuri_FFMTI_CII_Tehnologii_informationale_si_de_comunicare_in_instruire_120_distanta_2024%20.pdf' }
  ]
};

const studyPrograms = [
  {
    title: 'Licență - Informatică / Informatică și Matematică',
    badge: 'Ciclul I',
    description: 'Formare fundamentală în programare, algoritmi, baze de date, rețele și tehnologii web.'
  },
  {
    title: 'Licență - Informatică și Fizică / Fizică și Informatică / Geografie și Informatică',
    badge: 'Ciclul I',
    description: 'Programe interdisciplinare pentru pregătirea cadrelor didactice și specialiștilor digitali.'
  },
  {
    title: 'Master - Tehnologii informaționale avansate',
    badge: 'Ciclul II',
    description: 'Cursuri de securitate, sisteme distribuite, IA, metodologii de cercetare și competențe digitale.'
  }
];

const calendarItems = [
  {
    date: '15 octombrie 1985',
    title: 'Constituirea Catedrei Informatică și Tehnică de Calcul',
    note: 'Prima catedră de informatică din Moldova, fondată în cadrul IPST/UST.'
  },
  {
    date: 'Iunie 1992',
    title: 'Evacuarea UST la Chișinău',
    note: 'Catedra ITI își reia activitatea și reconstruiește laboratoarele de la zero.'
  },
  {
    date: 'Din 2010',
    title: 'Olimpiada Interuniversitară de Informatică',
    note: 'Eveniment academic anual organizat de Catedra ITI pentru studenți.'
  },
  {
    date: 'Octombrie 2021',
    title: 'Lansarea CRAI Lab',
    note: 'Laboratorul de Inteligență Artificială Creativă: roboți, drone, imprimare 3D și STEAM.'
  }
];

const newsItems = [
  {
    id: 'n1',
    dateIso: '2021-10-30',
    displayDate: '30 octombrie 2021',
    category: 'Eveniment major',
    title: 'Conferință internațională STEAM organizată de UST și Catedra ITI',
    excerpt: 'For științific cu participare internațională, dedicat abordărilor inter/transdisciplinare.',
    content:
      'În perioada 29-30 octombrie 2021, UST, prin Catedra ITI, a găzduit conferința internațională dedicată conceptului STEAM, cu participare largă din mediul academic național și internațional.',
    pinned: true
  },
  {
    id: 'n2',
    dateIso: '2021-10-01',
    displayDate: 'octombrie 2021',
    category: 'Infrastructură',
    title: 'Lansarea Laboratorului de Inteligență Artificială Creativă (CRAI Lab)',
    excerpt: 'Spațiu modern pentru IA, robotică, drone și activități didactice STEAM.',
    content:
      'CRAI Lab a fost lansat pentru modernizarea procesului de predare-învățare-evaluare și dezvoltarea competențelor digitale, cu infrastructură orientată pe proiecte practice.',
    pinned: false
  },
  {
    id: 'n3',
    dateIso: '2010-04-10',
    displayDate: 'din 2010',
    category: 'Competiție',
    title: 'Olimpiada Interuniversitară de Informatică',
    excerpt: 'Competiție organizată constant de Catedra ITI pentru studenți din universități din țară.',
    content:
      'Prin acest eveniment, catedra stimulează performanța și implicarea studenților în cercetare, algoritmică și dezvoltare software.',
    pinned: false
  },
  {
    id: 'n4',
    dateIso: '1992-06-15',
    displayDate: 'iunie 1992',
    category: 'Istorie',
    title: 'Relansarea Catedrei ITI la Chișinău',
    excerpt: 'După evacuare, catedra a reconstruit baza materială și activitatea didactică.',
    content:
      'În contextul evacuării UST, Catedra ITI a relansat laboratoarele și procesul de instruire, consolidând un nou început instituțional la Chișinău.',
    pinned: false
  },
  {
    id: 'n5',
    dateIso: '1985-10-15',
    displayDate: '15 octombrie 1985',
    category: 'Istorie',
    title: 'Înființarea Catedrei ITIC (actuala Catedră ITI)',
    excerpt: 'Moment fondator pentru dezvoltarea informaticii universitare în Moldova.',
    content:
      'Prin decizia Ministerului Învățământului Superior, la UST/IPST a fost constituită catedra care a devenit ulterior Catedra Informatică și Tehnologii Informaționale.',
    pinned: false
  },
  {
    id: 'n6',
    dateIso: '2026-04-02',
    displayDate: '2 aprilie 2026',
    category: 'Conferință',
    title: 'PER ASPERA AD ASTRA — Conferința Științifică Studențească, ed. LXXV',
    excerpt: 'În data de 2 aprilie 2026, la FMTI a avut loc Conferința Științifică Studențească „Probleme și soluții în știința contemporană", ediția LXXV, cu participarea a circa 50 de studenți.',
    content: 'În data de 2 aprilie, 2026, la Facultatea de Matematică și Tehnologii Informaționale a UPSC „Ion Creangă" din Chișinău, a avut loc Conferința Științifică Studențească „Probleme și soluții în știința contemporană", ediția a LXXV-a, organizată cu sprijinul catedrelor din cadrul facultății.\n\nLa conferință au participat circa 50 de studenți – autori și coautori ai lucrărilor prezentate, precum și profesorii coordonatori ai acestora. Conferința a fost organizată în 5 secțiuni tematice, în cadrul cărora au fost susținute în total 28 de comunicări științifice.\n\nCatedra Informatică și Tehnologii Informaționale a contribuit activ la bunul mers al evenimentului, cu 2 secțiuni și 12 comunicări prezentate.\n\nFelicităm toți participanții pentru curajul de a-și prezenta cercetările în public și îi încurajăm să continue activitatea științifică! Îi felicităm în mod deosebit pe laureații concursului: Scobioală Valentina și Moraru Cătălin, care s-au remarcat prin cercetările lor de calitate.\n\nConferința a reprezentat nu doar o ocazie de a prezenta rezultatele muncii științifice, ci și un prilej de a descoperi perspective noi, de a stabili conexiuni valoroase și de a-și motiva colegii să se implice mai activ în cercetare.\n\nVă urăm succese în activitatea de cercetare! Per aspera ad astra!',
    photos: [
      '659638009_122183431772835195_1443761851665853884_n.jpg',
      '659740443_122183432942835195_2105269260457279348_n.jpg',
      '659799932_122183431460835195_3832111940224155701_n.jpg',
      '659852207_122183432102835195_138163403429288966_n.jpg',
      '659858955_122183432006835195_5464180748315198775_n.jpg',
      '659888749_122183431970835195_4341220101751847909_n.jpg',
      '660014753_122183432792835195_7429878996897776746_n.jpg',
      '660066274_122183431646835195_1836193841087198118_n.jpg',
      '660116883_122183432186835195_8480955920630373322_n.jpg',
      '660131907_122183431616835195_5029770175357778819_n.jpg',
      '660293589_122183432348835195_4753061432511502022_n.jpg',
      '660326818_122183432516835195_3278285935065163436_n.jpg',
      '660382151_122183432618835195_4614308924424115021_n.jpg',
      '660423109_122183432978835195_6607596287087822302_n.jpg',
      '660468167_122183431502835195_3524405523568940118_n.jpg',
      '660492675_122183432270835195_4857679598569907083_n.jpg',
      '660789811_122183431868835195_6106404828239636555_n.jpg',
      '660857714_122183432396835195_8105464237259248858_n.jpg',
      '660861790_122183433170835195_1128201101862177648_n.jpg',
      '660861794_122183433086835195_7338878719860271124_n.jpg',
      '660864288_122183433332835195_6379654880699137263_n.jpg',
      '661134416_122183433026835195_6313603817688909850_n.jpg',
      '661336933_122183431544835195_666864255730332770_n.jpg',
      '661455372_122183433128835195_3219292089669544052_n.jpg',
      '661462521_122183432030835195_8932662311942151194_n.jpg',
      '662153967_122183432702835195_5616136783535396023_n.jpg',
      '662273398_122183432228835195_5367361987609750689_n.jpg',
      '662278514_122183431628835195_6730908318568141377_n.jpg',
      '662715410_122183432438835195_3527621051134683663_n.jpg',
      '662738273_122183432612835195_5770998185493750652_n.jpg',
      '662739282_122183433278835195_1377844151633004404_n.jpg',
      '662884254_122183431766835195_6731352603145573769_n.jpg',
      '663059045_122183433362835195_6799569795210793199_n.jpg',
      '663066913_122183431688835195_2660725726615438675_n.jpg',
      '663287335_122183432756835195_3427539381910939276_n.jpg',
      '663359463_122183432846835195_8289795808014619622_n.jpg'
    ].map(f => './conferinta studenteasca/' + f),
    pinned: false
  },
  {
    id: 'n7',
    dateIso: '2026-04-24',
    displayDate: '24 aprilie 2026',
    category: 'Distincție academică',
    title: 'Prof. univ. Liubomir Chiriac — Membru Corespondent al Academiei de Științe a Moldovei',
    excerpt: 'Colectivul Catedrei ITI felicită șeful catedrei, prof. univ. dr. hab. Liubomir Chiriac, pentru acordarea titlului de Membru Corespondent al Academiei de Științe a Moldovei.',
    content: 'Colectivul Catedrei Informatică și Tehnologii Informaționale din cadrul Universității Pedagogice de Stat „Ion Creangă" din Chișinău exprimă profundă apreciere pentru acordarea titlului de Membru corespondent al Academiei de Științe a Moldovei domnului doctor habilitat, profesor universitar, șef al catedrei Informatică și Tehnologii Informaționale, Liubomir CHIRIAC.\n\nDistincția conferită conturează impactul de durată al activității desfășurate, reflectând rigoarea profesională, spiritul inovator și rolul definitoriu în consolidarea și modernizarea învățământului superior.\n\nSunt adresate urări de sănătate, inspirație și rezultate remarcabile în activitatea viitoare.\n\nCu considerație,\nColectivul Catedrei Informatică și Tehnologii Informaționale\n\n***\n\nКоллектив кафедры информатики и информационных технологий ГБУ «Ion Creanga» г. Кишинев выражает глубокую признательность за присвоение звания члена-корреспондента Академии наук Молдовы одаренному доктору, профессору университета, заведующему кафедрой информационных технологий Любомиру ХИРИАК.\n\nВрученное отличие говорит о долговременном влиянии проводимой деятельности, отражающем профессиональную строгость, инновационный дух и определяющую роль в укреплении и модернизации.\n\nПожелания здоровья, вдохновения и замечательных результатов в будущей деятельности.\n\nС учетом того,\nКоллектив кафедры компьютерных и информационных технологий',
    photos: ['./foto%20catedra/corespondent.jpg'],
    pinned: true
  }
];

const sortedNewsItems = [...newsItems].sort(
  (leftItem, rightItem) => new Date(rightItem.dateIso) - new Date(leftItem.dateIso)
);

const videoItems = [
  { title: 'Prezentare generală a catedrei', link: 'https://www.ust.md', tag: 'Instituțional' },
  { title: 'Laboratoare și infrastructură IT', link: 'https://www.ust.md', tag: 'Campus' },
  { title: 'Proiecte ale studenților', link: 'https://www.ust.md', tag: 'Proiecte' }
];

const GALLERY_CATEDRA_FILES = [
  '0.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg',
  '13.jpg', '14.jpg', '15.jpg', '19.jpg', '20.jpg', '22.jpg', '23.jpg', '24.jpg',
  '25.jpg', '26.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '37.jpg',
  '38.jpg', '39.jpg', '40.jpg', '41.jpg', '42.jpg', '43.jpg',
  'catedra iti emblema.jpg', 'emblema iti.jpg', 'citi 40 de ani.jpg', 'fmti 95 ani copy.jpg'
];

const GALLERY_CONFERINTA_FILES = [
  '659638009_122183431772835195_1443761851665853884_n.jpg',
  '659740443_122183432942835195_2105269260457279348_n.jpg',
  '659799932_122183431460835195_3832111940224155701_n.jpg',
  '659852207_122183432102835195_138163403429288966_n.jpg',
  '659858955_122183432006835195_5464180748315198775_n.jpg',
  '659888749_122183431970835195_4341220101751847909_n.jpg',
  '660014753_122183432792835195_7429878996897776746_n.jpg',
  '660066274_122183431646835195_1836193841087198118_n.jpg',
  '660116883_122183432186835195_8480955920630373322_n.jpg',
  '660131907_122183431616835195_5029770175357778819_n.jpg',
  '660293589_122183432348835195_4753061432511502022_n.jpg',
  '660326818_122183432516835195_3278285935065163436_n.jpg',
  '660382151_122183432618835195_4614308924424115021_n.jpg',
  '660423109_122183432978835195_6607596287087822302_n.jpg',
  '660468167_122183431502835195_3524405523568940118_n.jpg',
  '660492675_122183432270835195_4857679598569907083_n.jpg',
  '660789811_122183431868835195_6106404828239636555_n.jpg',
  '660857714_122183432396835195_8105464237259248858_n.jpg',
  '660861790_122183433170835195_1128201101862177648_n.jpg',
  '660861794_122183433086835195_7338878719860271124_n.jpg',
  '660864288_122183433332835195_6379654880699137263_n.jpg',
  '661134416_122183433026835195_6313603817688909850_n.jpg',
  '661336933_122183431544835195_666864255730332770_n.jpg',
  '661455372_122183433128835195_3219292089669544052_n.jpg',
  '661462521_122183432030835195_8932662311942151194_n.jpg',
  '662153967_122183432702835195_5616136783535396023_n.jpg',
  '662273398_122183432228835195_5367361987609750689_n.jpg',
  '662278514_122183431628835195_6730908318568141377_n.jpg',
  '662715410_122183432438835195_3527621051134683663_n.jpg',
  '662738273_122183432612835195_5770998185493750652_n.jpg',
  '662739282_122183433278835195_1377844151633004404_n.jpg',
  '662884254_122183431766835195_6731352603145573769_n.jpg',
  '663059045_122183433362835195_6799569795210793199_n.jpg',
  '663066913_122183431688835195_2660725726615438675_n.jpg',
  '663287335_122183432756835195_3427539381910939276_n.jpg',
  '663359463_122183432846835195_8289795808014619622_n.jpg'
];

const galleryItems = [
  ...GALLERY_CATEDRA_FILES.map((f, i) => ({
    id: `gc${i}`,
    src: getCatedraImagePath(f),
    category: 'Catedra ITI',
    title: `Catedra ITI — foto ${i + 1}`
  })),
  ...GALLERY_CONFERINTA_FILES.map((f, i) => ({
    id: `gconf${i}`,
    src: `./conferinta%20studenteasca/${encodeURIComponent(f)}`,
    category: 'Conferință Studențească',
    title: `Conferință studențească 2026 — foto ${i + 1}`
  }))
];

const EMBLEM_IMAGE_FILES = ['catedra iti emblema.jpg', 'emblema iti.jpg'];

const HOME_CAROUSEL_IMAGE_FILES = [
  '0.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '19.jpg',
  '20.jpg',
  '22.jpg',
  '23.jpg',
  '24.jpg',
  '25.jpg',
  '26.jpg',
  '29.jpg',
  '30.jpg',
  '31.jpg',
  '32.jpg',
  '33.jpg',
  '37.jpg',
  '38.jpg',
  '39.jpg',
  '40.jpg',
  '41.jpg',
  '42.jpg',
  '43.jpg'
];

const HOME_HERO_BACKGROUND_IMAGE_FILES = ['fmti 95 ani copy.jpg', 'citi 40 de ani.jpg'];

function getCatedraImagePath(fileName) {
  return `./foto%20catedra/${encodeURIComponent(fileName)}`;
}

const tendinteChapters = [
  'Istoria Catedrei ITI',
  'Informații esențiale despre Catedră',
  'Evenimente importante ale Catedrei',
  'Cercetare și dezvoltare',
  'Membrii Catedrei ITI'
];

const historicalTimeline = [
  {
    year: '1930',
    title: 'Fondarea UST',
    text: 'Universitatea de Stat din Tiraspol este constituită ca prima instituție de învățământ superior din Moldova.'
  },
  {
    year: '1985',
    title: 'Constituirea Catedrei ITIC',
    text: 'La 15 octombrie este creată Catedra de Informatică și Tehnică de Calcul, una dintre primele catedre de informatică din fosta URSS.'
  },
  {
    year: '1986',
    title: 'Primele laboratoare și conferințe',
    text: 'În UST funcționează laboratoare de calculatoare, iar catedra organizează conferințe de informatică cu participare extinsă.'
  },
  {
    year: '1992',
    title: 'Evacuarea la Chișinău',
    text: 'După războiul transnistrean, catedra este relocată și începe reconstrucția bazei tehnico-materiale.'
  },
  {
    year: '2005-2010',
    title: 'Conducere academică',
    text: 'Șef catedră: Andrei Braicov. Continuă modernizarea infrastructurii și consolidarea echipei.'
  },
  {
    year: '2010',
    title: 'Etapa actuală',
    text: 'Șef catedră: Liubomir Chiriac. Catedra își extinde cercetarea, colaborările și proiectele STEAM/IA.'
  },
  {
    year: '2021',
    title: 'CRAI Lab',
    text: 'Este lansat Laboratorul de Inteligență Artificială Creativă, cu infrastructură modernă pentru proiecte IA, robotică și drone.'
  },
  {
    year: '2021',
    title: 'Conferința internațională STEAM',
    text: 'UST și Catedra ITI organizează un forum internațional dedicat abordărilor inter/transdisciplinare în predarea științelor reale.'
  }
];

const currentFacilities = [
  '8 săli de calculatoare moderne conectate la Internet',
  'Laboratorul Tehnologii Informaționale „Prof. Doctor Iulian Marcov”',
  'Laboratorul „Creative Artificial Intelligence” (CRAI Lab)',
  'Laboratorul „Algoritmi și Programare. Cyber”'
];

const studySpecialties = [
  'Informatică',
  'Informatică și Matematică',
  'Informatică și Fizică',
  'Matematică și Informatică',
  'Fizică și Informatică',
  'Geografie și Informatică'
];

const bachelorDisciplines = [
  'Sisteme de operare și arhitectura calculatorului',
  'Fundamentele Programării (Pascal)',
  'Programare în limbajul C',
  'Programare orientată pe obiecte (C++)',
  'Robotica educațională',
  'Limbaje de asamblare',
  'Baze de date',
  'Tehnologii Web',
  'Tehnici de programare',
  'Teoria grafurilor și Rețele Petri',
  'Inteligența artificială și algoritmi genetici',
  'JavaScript, analiza algoritmilor, rețele de calculatoare'
];

const masterDisciplines = [
  'Tehnologii Web avansate',
  'Criptografie și securitate informațională',
  'Sisteme distribuite',
  'Metode logice în IA',
  'Structuri algebrice pe calculator',
  'Java și C#',
  'Testarea produselor program',
  'Metode și tehnici de cercetare în TIC',
  'Competențe digitale pentru profesori',
  'Prelucrarea statistică a informației psihopedagogice'
];

const researchDirections = [
  {
    title: 'Rețele Petri, grafuri, modele computaționale',
    topics: [
      'Modelarea sistemelor cu procese paralele și evenimente discrete',
      'Analiza cantitativă/calitativă a scenariilor de evacuare',
      'Algoritmi pentru căutare în baze de imagini, inclusiv imagini medicale'
    ]
  },
  {
    title: 'Didactica informaticii, STEAM, IA și robotică',
    topics: [
      'Integrarea LMS/LCMS în predare-învățare-evaluare',
      'Metodologii pentru dezvoltarea competențelor digitale',
      'Implementarea inter/transdisciplinară a conceptului STEAM'
    ]
  },
  {
    title: 'Algebră computațională și criptare',
    topics: [
      'Studiul structurilor algebrice și quasigrupurilor finite',
      'Algoritmi pentru probleme de geometrie computațională',
      'Aplicații în criptografie pe baza structurilor algebrice'
    ]
  }
];

const majorProjects = [
  'Tempus WETEN (2009-2011)',
  'Tempus IV TEREC (2010-2013)',
  'Tempus IV QUAEM (2012-2014)',
  'Erasmus+ TEACH ME (2015-2018)',
  'Proiect instituțional de formare continuă asistată de calculator (2015-2019)',
  'NATO SPS G5437 WITNESS (2018-2020)',
  'Program de Stat STEAM (2020-2023)'
];

const partnerInstitutions = [
  'Institutul de Tehnologii din Kaunas (Lituania)',
  'Universitatea Regală de Tehnologii din Stockholm (Suedia)',
  'Universitatea din Hasselt (Belgia)',
  'Universitatea din Aveiro (Portugalia)',
  'Universitatea Nouă din Lisabona (Portugalia)',
  'TimSoft Timișoara (România)',
  'Universitatea Pedagogică din Cracovia (Polonia)',
  'Universitatea din Craiova (România)',
  'Universitatea din Genova (Italia)'
];

const presentMembers = [
  'Liubomir Chiriac - doctor habilitat, profesor universitar, șef catedră ITI',
  'Andrei Braicov - doctor, conferențiar universitar, decan FMTI',
  'Angela Globa - doctor, conferențiar universitar, prorector',
  'Dorin Pavel - doctor, conferențiar universitar',
  'Ala Gașnaș - doctor, conferențiar universitar',
  'Maria Pavel - doctor, conferențiar universitar',
  'Teodora Vascan - doctor, conferențiar universitar',
  'Natalia Josu (Bobeica) - doctor, conferențiar universitar',
  'Natalia Lupașco - doctor, conferențiar universitar, șef CRAI Lab',
  'Tatiana Veveriță - doctor, conferențiar universitar',
  'Inga Tițchiev - doctor, conferențiar universitar',
  'Sergiu Corlat - doctor, conferențiar universitar',
  'Lilia Mihalache - doctor, conferențiar universitar',
  'Olga Cerbu - doctor, conferențiar universitar',
  'Violeta Bogdanova - doctorand',
  'Aurel Danilov - doctorand',
  'Vasile Galben - inginer programator șef',
  'Ana Racoviță (Mihalache) - laborant superior',
  'Veaceslav Zalinschi - administrator șef rețea',
  'Dumitru Rugaliov - inginer asistent'
];

const didYouKnowFacts = [
  'UST (1930) este prima instituție de învățământ superior din Moldova.',
  'Facultatea FMTI (1930) este prima facultate de profil matematic-fizic din Moldova.',
  'Catedra ITI (1985) este prima catedră de informatică din Moldova.',
  'Catedra are contribuții științifice majore: publicații, monografii, manuale și proiecte internaționale.',
  'UST a format peste 100.000 de specialiști, activi în educație, administrație și cercetare.'
];

function normalizePage(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeForSearch(value) {
  return (value || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getQueryParameter(parameterName) {
  return new URLSearchParams(window.location.search).get(parameterName);
}

function appendQueryParams(href, params) {
  if (!href || href === '#') {
    return '#';
  }

  const [hrefWithoutHash, hashValue] = href.split('#');
  const [basePath, currentQuery] = hrefWithoutHash.split('?');
  const searchParams = new URLSearchParams(currentQuery || '');

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  });

  const nextQuery = searchParams.toString();
  return `${basePath}${nextQuery ? `?${nextQuery}` : ''}${hashValue ? `#${hashValue}` : ''}`;
}

function getActivePageKey() {
  const allowedPages = Object.keys(PAGE_DEFINITIONS);
  const queryPage = normalizePage(getQueryParameter('view'));
  const datasetPage = normalizePage(document.body.getAttribute('data-page'));
  const configPage = normalizePage(runtimeConfig.defaultPage);
  const candidate = queryPage || datasetPage || configPage || 'home';

  return allowedPages.includes(candidate) ? candidate : 'home';
}

function getHrefByKey(pageKey) {
  const foundLink = NAV_LINKS.find((item) => item.key === pageKey);
  return foundLink ? foundLink.href : '#';
}

function getNewsHref(articleId) {
  if (IS_WORDPRESS_MODE) {
    return appendQueryParams(getHrefByKey('home'), { view: 'noutati', article: articleId });
  }

  const baseHref = getHrefByKey('noutati') || 'noutati.html';
  return appendQueryParams(baseHref, { article: articleId });
}

function getTeacherProfileHref(teacherId) {
  if (IS_WORDPRESS_MODE) {
    return appendQueryParams(getHrefByKey('home'), { view: 'profesor', id: teacherId });
  }

  return appendQueryParams('profesor.html', { id: teacherId });
}

function getTeacherById(teacherId) {
  const normalizedTeacherId = normalizePage(teacherId);
  return teacherProfiles.find((teacher) => teacher.id === normalizedTeacherId) || null;
}

function setMetaTag(attributeName, attributeValue, contentValue) {
  if (!contentValue) {
    return;
  }

  let node = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attributeName, attributeValue);
    document.head.appendChild(node);
  }

  node.setAttribute('content', contentValue);
}

function setCanonicalLink(urlValue) {
  if (!urlValue) {
    return;
  }

  let linkElement = document.head.querySelector('link[rel="canonical"]');
  if (!linkElement) {
    linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'canonical');
    document.head.appendChild(linkElement);
  }

  linkElement.setAttribute('href', urlValue);
}

function updateSeoForPage(activePage, teacher) {
  const pageDefinition = PAGE_DEFINITIONS[activePage] || PAGE_DEFINITIONS.home;
  const computedTitle = teacher ? `${teacher.name} | Catedra ITI` : `${pageDefinition.title} | Catedra ITI`;
  const computedDescription = teacher
    ? teacher.bio
    : pageDefinition.subtitle || 'Catedra Informatică și Tehnologii Informaționale Universitatea Pedagocică de Stat „Ion Creangă”';

  document.title = computedTitle;
  setMetaTag('name', 'description', computedDescription);
  setMetaTag('name', 'robots', 'index,follow');
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', computedTitle);
  setMetaTag('name', 'twitter:description', computedDescription);
  setMetaTag('property', 'og:type', teacher ? 'profile' : 'website');
  setMetaTag('property', 'og:locale', 'ro_RO');
  setMetaTag('property', 'og:title', computedTitle);
  setMetaTag('property', 'og:description', computedDescription);
  setMetaTag('property', 'og:url', window.location.href.split('#')[0]);
  setCanonicalLink(window.location.href.split('#')[0]);
}

function getInitialTheme() {
  try {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch (error) {
    return 'light';
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);

  try {
    localStorage.setItem(STORAGE_KEYS.theme, themeName);
  } catch (error) {
    return null;
  }

  return null;
}

function registerAndGetVisitCount() {
  try {
    const rawCount = localStorage.getItem(STORAGE_KEYS.visitCount);
    const currentCount = Number.parseInt(rawCount || '0', 10);
    const safeCount = Number.isFinite(currentCount) ? currentCount : 0;

    if (sessionStorage.getItem(STORAGE_KEYS.visitSessionFlag) === '1') {
      return safeCount;
    }

    const nextCount = safeCount + 1;
    localStorage.setItem(STORAGE_KEYS.visitCount, String(nextCount));
    sessionStorage.setItem(STORAGE_KEYS.visitSessionFlag, '1');
    return nextCount;
  } catch (error) {
    return null;
  }
}

function registerServiceWorkerIfPossible() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  if (runtimeConfig.enableServiceWorker === false) {
    return;
  }

  const isSecureContext =
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  if (!isSecureContext) {
    return;
  }

  const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
  const serviceWorkerPath = `${window.location.origin}${basePath}service-worker.js`;

  navigator.serviceWorker.register(serviceWorkerPath).catch(() => null);
}

function Section({ title, note, alt = false, children }) {
  const sectionClassName = alt ? 'section section-alt' : 'section';

  return template`
    <section className=${sectionClassName}>
      <div className="container">
        <div className="section-head">
          <h2>${title}</h2>
          ${note ? template`<p>${note}</p>` : null}
        </div>
        ${children}
      </div>
    </section>
  `;
}

function ThemeToggle({ theme, onToggle }) {
  const isDarkMode = theme === 'dark';
  const buttonLabel = isDarkMode ? 'Comută pe Light Mode' : 'Comută pe Dark Mode';

  return template`
    <button type="button" className="theme-toggle" onClick=${onToggle} aria-label=${buttonLabel}>
      <span>${isDarkMode ? '🌙' : '☀️'}</span>
      <span>${isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  `;
}

function SiteHeader({ activePage, theme, onToggleTheme, visitCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroBackgroundIndex, setHeroBackgroundIndex] = useState(0);
  const pageData = PAGE_DEFINITIONS[activePage] || PAGE_DEFINITIONS.home;
  const isHomePage = activePage === 'home';

  const activeHeroBackgroundFile = HOME_HERO_BACKGROUND_IMAGE_FILES[
    heroBackgroundIndex % HOME_HERO_BACKGROUND_IMAGE_FILES.length
  ];
  const heroBackgroundStyle = useMemo(() => {
    const overlay = theme === 'dark'
      ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.72) 0%, rgba(55, 48, 163, 0.68) 50%, rgba(76, 29, 149, 0.7) 100%)'
      : 'linear-gradient(135deg, rgba(29, 78, 216, 0.72) 0%, rgba(79, 70, 229, 0.66) 50%, rgba(124, 58, 237, 0.68) 100%)';
    return {
      backgroundImage: `${overlay}, url('${getCatedraImagePath(activeHeroBackgroundFile)}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '120px 0',
      minHeight: '420px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  }, [theme, activeHeroBackgroundFile]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activePage]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setHeroBackgroundIndex(
        (previousIndex) => (previousIndex + 1) % HOME_HERO_BACKGROUND_IMAGE_FILES.length
      );
    }, 5000);

    return () => window.clearInterval(timerId);
  }, []);

  return template`
    <header className="top-strip">
      <div className="container top-strip-inner">
        <p>Catedra Informatică și Tehnologii Informaționale - Universitatea Pedagocică de Stat „Ion Creangă”</p>
        <p>Tendințe și perspective</p>
        <p style=${{ fontSize: '1.1rem', fontWeight: 600 }}>${visitCount !== null ? `Vizite pe acest browser: ${visitCount}` : 'Vizite indisponibile'}</p>
      </div>
    </header>

    <section className=”hero” style=${heroBackgroundStyle}>
      <div className=”container hero-inner” style=${{ width: '100%', textAlign: 'center' }}>
        <div className=”hero-copy hero-copy--center”>
          ${isHomePage
            ? template`
                <div style=${{ display: 'inline-flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <img
                    src=${'./LOGO%20CITI%20(1).svg'}
                    alt=”Logo CITI”
                    style=${{ height: '230px', width: 'auto', flexShrink: 0, filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
                    onError=${(event) => { event.currentTarget.style.display = 'none'; }}
                  />
                  <h1 style=${{ margin: 0, color: '#fff', textAlign: 'left', fontSize: '2.8rem', lineHeight: 1.25 }}>
                    <span className=”hero-title-line” style=${{ display: 'block' }}>Catedra Informatică și Tehnologii Informaționale</span>
                    <span className=”hero-title-line” style=${{ display: 'block' }}>Universitatea Pedagocică de Stat „Ion Creangă”</span>
                  </h1>
                </div>
              `
            : template`<h1 style=${{ color: '#fff', textAlign: 'center', margin: 0, fontSize: '3.4rem', lineHeight: 1.2 }}>${pageData.title}</h1>`}
        </div>
      </div>
    </section>

    <nav className="navbar">
      <div className="container nav-inner">
        <a className="brand" href=${getHrefByKey('home')} aria-label="Acasă Catedra ITI">
          <span className="brand-logos" aria-hidden="true">
            ${EMBLEM_IMAGE_FILES.map(
              (fileName) =>
                template`
                  <img
                    key=${fileName}
                    className="brand-emblem"
                    src=${getCatedraImagePath(fileName)}
                    alt=""
                    onError=${(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                `
            )}
          </span>
          <span className="brand-text">Catedra ITI</span>
        </a>

        <div className="nav-actions">
          <button
            type="button"
            className="menu-toggle"
            onClick=${() => setIsMenuOpen((previousState) => !previousState)}
            aria-expanded=${isMenuOpen}
            aria-label="Deschide meniul"
          >
            ${isMenuOpen ? 'Închide meniu' : 'Meniu'}
          </button>
          <${ThemeToggle} theme=${theme} onToggle=${onToggleTheme} />
        </div>

        <div className=${isMenuOpen ? 'menu is-open' : 'menu'}>
          ${NAV_LINKS.map(
            (item) =>
              template`
                <a
                  key=${item.key || item.href}
                  href=${item.href}
                  className=${`nav-link ${activePage === item.key ? 'is-active' : ''}`}
                  style=${{ fontSize: '1.15rem' }}
                  onClick=${() => setIsMenuOpen(false)}
                >
                  ${item.label}
                </a>
              `
          )}
        </div>
      </div>
    </nav>
  `;
}

function HomePage() {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const latestNews = useMemo(() => sortedNewsItems.slice(0, 3), []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setAnnouncementIndex((previousIndex) => (previousIndex + 1) % calendarItems.length);
    }, 5200);

    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCarouselIndex((previousIndex) => (previousIndex + 1) % HOME_CAROUSEL_IMAGE_FILES.length);
    }, 4200);

    return () => window.clearInterval(timerId);
  }, []);

  const activeAnnouncement = calendarItems[announcementIndex];
  const activeCarouselImage = HOME_CAROUSEL_IMAGE_FILES[carouselIndex];

  return template`
    <${Section}
      title="Galerie foto Catedra ITI"
      note="Carousel cu imagini din activitățile catedrei, evenimente și laboratoare."
    >
      <article className="carousel card">
        <div className="carousel-frame">
          <div
            key=${activeCarouselImage}
            className="carousel-image"
            style=${{ backgroundImage: `url('${getCatedraImagePath(activeCarouselImage)}')` }}
            role="img"
            aria-label=""
          ></div>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="ghost-button"
            onClick=${() =>
              setCarouselIndex(
                (previousIndex) =>
                  (previousIndex - 1 + HOME_CAROUSEL_IMAGE_FILES.length) % HOME_CAROUSEL_IMAGE_FILES.length
              )}
          >
            Anterior
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick=${() =>
              setCarouselIndex((previousIndex) => (previousIndex + 1) % HOME_CAROUSEL_IMAGE_FILES.length)}
          >
            Următor
          </button>
        </div>
      </article>
    </${Section}>

    <${Section}
      title="Indicatori principali"
      note="Repere istorice și academice ale Catedrei ITI în cadrul UST."
    >
      <div className="grid grid-4">
        ${departmentStats.map(
          (item) =>
            template`
              <article className="card stat-card" key=${item.label}>
                <p className="stat-value">${item.value}</p>
                <p className="stat-label">${item.label}</p>
                <div className="stat-track">
                  <span className="stat-fill" style=${{ width: item.progress }}></span>
                </div>
              </article>
            `
        )}
      </div>
    </${Section}>

    <${Section}
      title="Explorează secțiunile site-ului"
      note="Meniul redirecționează pe pagini diferite, iar interfața este optimizată pentru desktop și mobil."
      alt=${true}
    >
      <div className="grid grid-3">
        <a className="card quick-link" href=${getHrefByKey('despre')}>
          <h3>Despre Catedră</h3>
          <p>Istoric, misiune, obiective strategice și infrastructură academică.</p>
        </a>
        <a className="card quick-link" href=${getHrefByKey('profesori')}>
          <h3>Profesori</h3>
          <p>Căutare rapidă după rol și domeniu de expertiză + profil individual.</p>
        </a>
        <a className="card quick-link" href=${getHrefByKey('media')}>
          <h3>Media și Galerie</h3>
          <p>Tab-uri pentru video și lightbox interactiv pe galerie.</p>
        </a>
      </div>
    </${Section}>

    <${Section}
      title="Anunț evidențiat"
      note="Se actualizează automat din lista de evenimente, cu navigare manuală."
    >
      <article className="card announcement-card">
        <p className="timeline-date">${activeAnnouncement.date}</p>
        <h3>${activeAnnouncement.title}</h3>
        <p>${activeAnnouncement.note}</p>
        <div className="card-actions">
          <button
            type="button"
            className="ghost-button"
            onClick=${() =>
              setAnnouncementIndex(
                (previousIndex) => (previousIndex - 1 + calendarItems.length) % calendarItems.length
              )}
          >
            Anterior
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick=${() => setAnnouncementIndex((previousIndex) => (previousIndex + 1) % calendarItems.length)}
          >
            Următor
          </button>
        </div>
      </article>
    </${Section}>

    <${Section}
      title="Noutăți recente"
      note="Primele anunțuri importante sunt afișate direct pe pagina principală."
    >
      <div className="grid grid-3">
        ${latestNews.map(
          (newsItem) =>
            template`
              <article className="card news-card" key=${newsItem.id}>
                <p className="news-meta">${newsItem.displayDate} · ${newsItem.category}</p>
                <h3>${newsItem.title}</h3>
                <p>${newsItem.excerpt}</p>
                <div className="card-actions">
                  <a className="ghost-button" href=${getNewsHref(newsItem.id)}>Citește detalii</a>
                </div>
              </article>
            `
        )}
      </div>
      <div className="section-inline-action">
        <a className="ghost-button" href=${getHrefByKey('noutati')}>Vezi toate noutățile</a>
      </div>
    </${Section}>
  `;
}

function AboutPage() {
  return template`
    <${Section}
      title="Misiune și viziune"
      note="Catedra ITI formează specialiști competitivi, promovează cercetarea și dezvoltă educația digitală în Republica Moldova."
    >
      <div className="grid grid-2">
        <article className="card">
          <h3>Misiune</h3>
          <p>
            Informatica s-a constituit din matematică, iar misiunea catedrei este valorificarea acestui fundament
            pentru a forma specialiști capabili să proiecteze, implementeze și evalueze sisteme informatice moderne.
          </p>
        </article>
        <article className="card">
          <h3>Viziune</h3>
          <p>
            Catedra urmărește consolidarea statutului de centru de referință în educație digitală, cercetare aplicată,
            cooperare internațională și integrare a standardelor europene în formarea profesională.
          </p>
        </article>
      </div>
    </${Section}>

    <${Section} title="Direcții de dezvoltare" alt=${true}>
      <div className="grid grid-3">
        <article className="card">
          <h3>Digitalizare curriculară</h3>
          <p>Actualizarea continuă a cursurilor de informatică, IA, web, criptografie și sisteme distribuite.</p>
        </article>
        <article className="card">
          <h3>Parteneriate strategice</h3>
          <p>Cooperări active cu universități și centre internaționale pentru cercetare, mobilități și proiecte comune.</p>
        </article>
        <article className="card">
          <h3>Cercetare și inovare</h3>
          <p>Dezvoltarea laboratoarelor ITI și participarea în proiecte naționale/internaționale de tip Tempus, Erasmus+, NATO.</p>
        </article>
      </div>
    </${Section}>

    <${Section} title="Istoria dezvolarii Catedrei ITI">
      <div className="grid grid-2">
        <article className="card rich-text">
          <h3>Română</h3>
          <p>
            Buletinul informativ al Catedrei Informatică și Tehnologii Informaționale prezintă activitatea didactică,
            științifică și instituțională a catedrei. Documentul include date despre personal, programe de studii,
            parteneriate și realizări academice.
          </p>
          <div className="card-actions">
            <a className="ghost-button" href="./Buletin%20informativ_print.pdf" target="_blank" rel="noopener noreferrer">
              Deschide PDF
            </a>
            <a className="ghost-button" href="./Buletin%20informativ_print.pdf" download>
              Descarcă PDF
            </a>
          </div>
        </article>
        <article className="card rich-text">
          <h3>English</h3>
          <p>
            The Information Bulletin of the Department of Computer Science and Information Technologies presents the
            department's teaching, scientific and institutional activities. The document includes data on staff,
            study programmes, partnerships and academic achievements.
          </p>
          <div className="card-actions">
            <a className="ghost-button" href="./Buletin%20informativ_print.pdf" target="_blank" rel="noopener noreferrer">
              Open PDF
            </a>
            <a className="ghost-button" href="./Buletin%20informativ_print.pdf" download>
              Download PDF
            </a>
          </div>
        </article>
      </div>
    </${Section}>
  `;
}

function TeacherCard({ teacher, onCopyEmail }) {
  return template`
    <article className="card" key=${teacher.id}>
      <img
        className="teacher-photo"
        src=${teacher.photo}
        alt=${teacher.name}
        loading="lazy"
        onError=${(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />
      <h3>${teacher.name}</h3>
      <p className="chip chip-role">${teacher.role}</p>
      <p>${teacher.field}</p>
      <p>${teacher.subjects}</p>
      <p className="meta-line">Email: ${teacher.email}</p>
      <div className="card-actions">
        <button type="button" className="ghost-button" onClick=${() => onCopyEmail(teacher.email)}>
          Copiază email
        </button>
        <a className="ghost-button" href=${`mailto:${teacher.email}`}>Trimite email</a>
        <a className="ghost-button" href=${getTeacherProfileHref(teacher.id)}>Profil</a>
      </div>
    </article>
  `;
}

function ProfessorsPage({ onNotify }) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const roleOptions = useMemo(() => {
    return ['all', ...new Set(teacherProfiles.map((teacher) => teacher.role))];
  }, []);

  const filteredTeachers = useMemo(() => {
    const normalizedSearch = normalizeForSearch(searchValue);

    return teacherProfiles.filter((teacher) => {
      const matchesRole = selectedRole === 'all' || teacher.role === selectedRole;

      if (!matchesRole) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = normalizeForSearch(
        `${teacher.name} ${teacher.role} ${teacher.field} ${teacher.subjects} ${teacher.email}`
      );

      return searchableText.includes(normalizedSearch);
    });
  }, [searchValue, selectedRole]);

  const handleCopyEmail = async (emailAddress) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailAddress);
        onNotify('Email copiat în clipboard.');
      } else {
        onNotify('Clipboard indisponibil în acest browser.');
      }
    } catch (error) {
      onNotify('Copierea emailului a eșuat.');
    }
  };

  return template`
    <${Section}
      title="Cadre didactice"
      note="Filtrează lista după rol sau caută după nume, domeniu, disciplină și email."
    >
      <div className="filter-bar">
        <input
          type="search"
          className="input-control"
          placeholder="Caută profesor..."
          value=${searchValue}
          onInput=${(event) => setSearchValue(event.target.value)}
        />
        <select
          className="select-control"
          value=${selectedRole}
          onChange=${(event) => setSelectedRole(event.target.value)}
        >
          ${roleOptions.map(
            (roleOption) =>
              template`
                <option key=${roleOption} value=${roleOption}>
                  ${roleOption === 'all' ? 'Toate rolurile' : roleOption}
                </option>
              `
          )}
        </select>
        <button
          type="button"
          className="ghost-button"
          onClick=${() => {
            setSearchValue('');
            setSelectedRole('all');
          }}
        >
          Resetează
        </button>
        <p className="result-count">${filteredTeachers.length} rezultate</p>
      </div>

      ${filteredTeachers.length > 0
        ? template`
            <div className="grid grid-3">
              ${filteredTeachers.map(
                (teacher) =>
                  template`<${TeacherCard} key=${teacher.id} teacher=${teacher} onCopyEmail=${handleCopyEmail} />`
              )}
            </div>
          `
        : template`
            <article className="card empty-state">
              <h3>Nu există rezultate pentru căutarea ta</h3>
              <p>Încearcă alt text de căutare sau selectează alt rol din filtru.</p>
            </article>
          `}
    </${Section}>
  `;
}

function ProfessorDetailPage() {
  const requestedId = getQueryParameter('id');
  const selectedTeacher = getTeacherById(requestedId);

  if (!selectedTeacher) {
    return template`
      <${Section}
        title="Profesorul nu a fost găsit"
        note="Verifică link-ul sau selectează un profil din lista completă de profesori."
      >
        <article className="card empty-state">
          <h3>Profil indisponibil</h3>
          <p>ID-ul profesorului nu corespunde niciunui profil din baza curentă.</p>
          <div className="card-actions">
            <a className="ghost-button" href=${getHrefByKey('profesori')}>Înapoi la Profesori</a>
          </div>
        </article>
      </${Section}>
    `;
  }

  return template`
    <${Section}
      title=${selectedTeacher.name}
      note=${`${selectedTeacher.role} · ${selectedTeacher.field}`}
    >
      <div className="grid grid-2 profile-layout">
        <article className="card">
          <img
            className="teacher-photo teacher-photo--detail"
            src=${selectedTeacher.photo}
            alt=${selectedTeacher.name}
            onError=${(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
          <p className="chip chip-role">${selectedTeacher.role}</p>
          <p>${selectedTeacher.bio}</p>
          <p className="meta-line"><strong>Email:</strong> ${selectedTeacher.email}</p>
          <p className="meta-line"><strong>Birou:</strong> ${selectedTeacher.office}</p>
          <p className="meta-line"><strong>Consultații:</strong> ${selectedTeacher.officeHours}</p>
          ${(CV_FILES[selectedTeacher.name] || []).length > 0 ? template`
            <div style=${{ marginTop: '16px' }}>
              <h3>Curriculum Vitae</h3>
              <div className="card-actions">
                ${(CV_FILES[selectedTeacher.name] || []).map(cv => template`
                  <a
                    key=${cv.file}
                    className="ghost-button"
                    href=${'./cv/' + encodeURIComponent(cv.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >${cv.label}</a>
                `)}
              </div>
            </div>
          ` : null}
          <div className="card-actions">
            <a className="ghost-button" href=${`mailto:${selectedTeacher.email}`}>Contactează</a>
            <a className="ghost-button" href=${getHrefByKey('profesori')}>Înapoi la Profesori</a>
          </div>
        </article>

        <article className="card">
          <h3>Domenii de cercetare</h3>
          <div className="tag-list">
            ${selectedTeacher.researchTags.map(
              (tagLabel) =>
                template`<span key=${`${selectedTeacher.id}-${tagLabel}`} className="tag-pill">${tagLabel}</span>`
            )}
          </div>

          <h3>Realizări</h3>
          <ul className="detail-list">
            ${selectedTeacher.achievements.map(
              (item) => template`<li key=${`${selectedTeacher.id}-a-${item}`}>${item}</li>`
            )}
          </ul>

          <h3>Publicații și activitate științifică</h3>
          <ul className="detail-list">
            ${selectedTeacher.publications.map(
              (item) => template`<li key=${`${selectedTeacher.id}-p-${item}`}>${item}</li>`
            )}
          </ul>
        </article>
      </div>
    </${Section}>
  `;
}

function StudentsPage() {
  return template`
    <${Section} title="Planuri de studii — Documente oficiale" note="Apasă pe un program pentru a-l deschide direct în browser.">
      <div className="grid grid-2">
        <article className="card">
          <h3 style=${{ fontSize: '1.4rem' }}>Ciclul I — Licență</h3>
          <div className="card-actions" style=${{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px', marginTop: '12px' }}>
            ${STUDY_FILES.ciclu1.map(item => template`
              <a
                key=${item.file}
                className="ghost-button"
                href=${item.file}
                target="_blank"
                rel="noopener noreferrer"
                style=${{ width: '100%', textAlign: 'left', fontSize: '1.15rem' }}
              >${item.label}</a>
            `)}
          </div>
        </article>
        <article className="card">
          <h3 style=${{ fontSize: '1.4rem' }}>Ciclul II — Masterat</h3>
          <div className="card-actions" style=${{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px', marginTop: '12px' }}>
            ${STUDY_FILES.ciclu2.map(item => template`
              <a
                key=${item.file}
                className="ghost-button"
                href=${item.file}
                target="_blank"
                rel="noopener noreferrer"
                style=${{ width: '100%', textAlign: 'left', fontSize: '1.15rem' }}
              >${item.label}</a>
            `)}
          </div>
        </article>
      </div>
    </${Section}>

    <${Section} title="Calendar activități" note="Repere istorice și instituționale pentru evoluția Catedrei ITI." alt=${true}>
      <div className="timeline">
        ${calendarItems.map(
          (item) =>
            template`
              <article className="timeline-item" key=${`${item.date}-${item.title}`}>
                <p className="timeline-date">${item.date}</p>
                <h3>${item.title}</h3>
                <p>${item.note}</p>
              </article>
            `
        )}
      </div>
    </${Section}>
  `;
}

function MediaPage() {
  const [activeTab, setActiveTab] = useState('galerie');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('Toate');
  const [lightboxItem, setLightboxItem] = useState(null);

  const galleryCategories = useMemo(() => {
    return ['Toate', ...new Set(galleryItems.map((item) => item.category))];
  }, []);

  const filteredGalleryItems = useMemo(() => {
    if (selectedGalleryCategory === 'Toate') {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === selectedGalleryCategory);
  }, [selectedGalleryCategory]);

  useEffect(() => {
    if (!lightboxItem) {
      return undefined;
    }

    const onEscapePress = (event) => {
      if (event.key === 'Escape') {
        setLightboxItem(null);
      }
    };

    window.addEventListener('keydown', onEscapePress);
    return () => window.removeEventListener('keydown', onEscapePress);
  }, [lightboxItem]);

  return template`
    <${Section}
      title="Media"
      note="Comută între video și galerie; poți filtra elementele, iar imaginile se deschid în lightbox."
    >
      <div className="segmented-control">
        <button
          type="button"
          className=${activeTab === 'video' ? 'segment-button is-active' : 'segment-button'}
          onClick=${() => setActiveTab('video')}
        >
          Video
        </button>
        <button
          type="button"
          className=${activeTab === 'galerie' ? 'segment-button is-active' : 'segment-button'}
          onClick=${() => setActiveTab('galerie')}
        >
          Galerie foto
        </button>
      </div>

      ${activeTab === 'video'
        ? template`
            <div className="grid grid-3">
              ${videoItems.map(
                (item) =>
                  template`
                    <article className="card" key=${item.title}>
                      <div className="media-placeholder">Preview video</div>
                      <p className="chip">${item.tag}</p>
                      <h3>${item.title}</h3>
                      <p>${item.link}</p>
                    </article>
                  `
              )}
            </div>
          `
        : template`
            <div className="filter-bar compact">
              <select
                className="select-control"
                value=${selectedGalleryCategory}
                onChange=${(event) => setSelectedGalleryCategory(event.target.value)}
              >
                ${galleryCategories.map(
                  (categoryName) =>
                    template`
                      <option key=${categoryName} value=${categoryName}>${categoryName}</option>
                    `
                )}
              </select>
              <p className="result-count">${filteredGalleryItems.length} imagini</p>
            </div>

            <div className="grid grid-3">
              ${filteredGalleryItems.map(
                (item) =>
                  template`
                    <button
                      type="button"
                      className="card gallery-card"
                      key=${item.id}
                      onClick=${() => setLightboxItem(item)}
                    >
                      <img
                        src=${item.src}
                        alt=${item.title}
                        loading="lazy"
                        style=${{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
                        onError=${(e) => { e.target.style.display = 'none'; }}
                      />
                      <p className="chip" style=${{ marginTop: '8px', color: '#fff' }}>${item.category}</p>
                    </button>
                  `
              )}
            </div>
          `}

      ${lightboxItem
        ? template`
            <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick=${() => setLightboxItem(null)}>
              <div className="lightbox-content" onClick=${(event) => event.stopPropagation()}>
                <button type="button" className="lightbox-close" onClick=${() => setLightboxItem(null)}>
                  Închide
                </button>
                <img
                  src=${lightboxItem.src}
                  alt=${lightboxItem.title}
                  style=${{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '6px', display: 'block', margin: '0 auto' }}
                />
                <p className="chip" style=${{ marginTop: '12px', color: '#fff' }}>${lightboxItem.category}</p>
              </div>
            </div>
          `
        : null}
    </${Section}>
  `;
}

function NoutatiPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const highlightedArticleId = getQueryParameter('article');

  const categories = useMemo(() => ['Toate', ...new Set(newsItems.map((item) => item.category))], []);

  const filteredNews = useMemo(() => {
    const normalizedSearch = normalizeForSearch(searchValue);

    return sortedNewsItems.filter((item) => {
      const matchesCategory = selectedCategory === 'Toate' || item.category === selectedCategory;
      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return normalizeForSearch(`${item.title} ${item.excerpt} ${item.content}`).includes(normalizedSearch);
    });
  }, [searchValue, selectedCategory]);

  const highlightedArticle = useMemo(
    () => sortedNewsItems.find((item) => item.id === normalizePage(highlightedArticleId)),
    [highlightedArticleId]
  );

  return template`
    <${Section}
      title="Feed de noutăți"
      note="Filtrezi după categorie, cauți rapid și poți evidenția un articol prin link direct."
    >
      ${highlightedArticle
        ? template`
            <article className="card news-highlight">
              <p className="news-meta">${highlightedArticle.displayDate} · ${highlightedArticle.category}</p>
              <h3>${highlightedArticle.title}</h3>
              ${highlightedArticle.content.split('\n\n').map((para, i) =>
                template`<p key=${i}>${para}</p>`
              )}
              ${highlightedArticle.photos && highlightedArticle.photos.length > 0
                ? template`
                    <div className="grid grid-3" style=${{ marginTop: '24px', gap: '8px' }}>
                      ${highlightedArticle.photos.map((src, i) =>
                        template`
                          <img
                            key=${i}
                            src=${src}
                            alt=${'Foto ' + (i + 1)}
                            loading="lazy"
                            style=${{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '6px' }}
                            onError=${(e) => { e.target.style.display = 'none'; }}
                          />
                        `
                      )}
                    </div>
                  `
                : null}
            </article>
          `
        : null}

      <div className="filter-bar">
        <input
          type="search"
          className="input-control"
          value=${searchValue}
          onInput=${(event) => setSearchValue(event.target.value)}
          placeholder="Caută în noutăți..."
        />
        <select
          className="select-control"
          value=${selectedCategory}
          onChange=${(event) => setSelectedCategory(event.target.value)}
        >
          ${categories.map(
            (categoryName) =>
              template`<option key=${categoryName} value=${categoryName}>${categoryName}</option>`
          )}
        </select>
        <p className="result-count">${filteredNews.length} articole</p>
      </div>

      ${filteredNews.length > 0
        ? template`
            <div className="timeline">
              ${filteredNews.map(
                (item) =>
                  template`
                    <article className="timeline-item news-card" key=${item.id}>
                      <p className="news-meta">${item.displayDate} · ${item.category}</p>
                      <h3>${item.title}</h3>
                      <p>${item.excerpt}</p>
                      <div className="card-actions">
                        <a className="ghost-button" href=${getNewsHref(item.id)}>Citește detalii</a>
                      </div>
                    </article>
                  `
              )}
            </div>
          `
        : template`
            <article className="card empty-state">
              <h3>Nu există articole pentru filtrul selectat</h3>
              <p>Schimbă categoria sau textul de căutare pentru a vedea rezultatele.</p>
            </article>
          `}
    </${Section}>
  `;
}

function TendintePerspectivePage() {
  return template`
    <${Section}
      title="Istoricul Catedrei Informatică și Tehnologii Informaționale"
      note="Material sintetic bazat pe istoria, activitatea științifico-didactică și direcțiile de dezvoltare ale Catedrei ITI."
    >
      <article className="card rich-text">
        <p>
          Informatica s-a constituit și s-a dezvoltat ca știință din matematică, iar dezvoltarea ei modernă este
          strâns legată de modelarea logică, formalizarea proceselor și implementarea lor în limbajul calculatoarelor.
          Profesorii Catedrei ITI continuă această tradiție prin inovare, creativitate, cercetare și formarea
          specialiștilor competitivi.
        </p>
      </article>
    </${Section}>

    <${Section} title="Cuprins" alt=${true}>
      <div className="grid grid-2">
        ${tendinteChapters.map(
          (chapter, index) => template`<article className="card" key=${chapter}><p>${index + 1}. ${chapter}</p></article>`
        )}
      </div>
    </${Section}>

    <${Section} title="Repere istorice">
      <div className="timeline">
        ${historicalTimeline.map(
          (item) => template`
            <article className="timeline-item" key=${`${item.year}-${item.title}`}>
              <p className="timeline-date">${item.year}</p>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>
          `
        )}
      </div>
    </${Section}>

    <${Section} title="Echipamente, dotare și activități" alt=${true}>
      <div className="grid grid-2">
        <article className="card">
          <h3>Infrastructură actuală</h3>
          <ul className="detail-list">
            ${currentFacilities.map((item) => template`<li key=${item}>${item}</li>`) }
          </ul>
        </article>
        <article className="card">
          <h3>Specialități deservite</h3>
          <ul className="detail-list">
            ${studySpecialties.map((item) => template`<li key=${item}>${item}</li>`) }
          </ul>
        </article>
      </div>
    </${Section}>

    <${Section} title="Activitatea științifico-didactică">
      <div className="grid grid-2">
        <article className="card">
          <h3>Ciclul I (Licență)</h3>
          <ul className="detail-list">
            ${bachelorDisciplines.map((item) => template`<li key=${item}>${item}</li>`) }
          </ul>
        </article>
        <article className="card">
          <h3>Ciclul II (Masterat)</h3>
          <ul className="detail-list">
            ${masterDisciplines.map((item) => template`<li key=${item}>${item}</li>`) }
          </ul>
        </article>
      </div>
    </${Section}>

    <${Section} title="Cercetare: rezultate și perspective" alt=${true}>
      <div className="grid grid-3">
        ${researchDirections.map(
          (direction) => template`
            <article className="card" key=${direction.title}>
              <h3>${direction.title}</h3>
              <ul className="detail-list">
                ${direction.topics.map((topic) => template`<li key=${topic}>${topic}</li>`) }
              </ul>
            </article>
          `
        )}
      </div>
      <article className="card">
        <h3>Proiecte relevante</h3>
        <ul className="detail-list">
          ${majorProjects.map((item) => template`<li key=${item}>${item}</li>`) }
        </ul>
      </article>
    </${Section}>

    <${Section}
      title="Interferențe științifice și cooperări eficiente"
      note="Catedra ITI colaborează cu instituții universitare naționale și internaționale în proiecte de educație și cercetare."
    >
      <article className="card">
        <ul className="detail-list">
          ${partnerInstitutions.map((item) => template`<li key=${item}>${item}</li>`) }
        </ul>
      </article>
    </${Section}>

    <${Section} title="Membrii Catedrei ITI" alt=${true}>
      <article className="card">
        <ul className="detail-list columns-list">
          ${presentMembers.map((item) => template`<li key=${item}>${item}</li>`) }
        </ul>
      </article>
    </${Section}>

    <${Section}
      title="Știați că..."
      note="Date instituționale despre UST și rolul Catedrei ITI în dezvoltarea educației informatice."
    >
      <div className="grid grid-2">
        ${didYouKnowFacts.map(
          (fact) => template`
            <article className="card" key=${fact}>
              <p>${fact}</p>
            </article>
          `
        )}
      </div>
      <article className="card rich-text">
        <p>
          Catedra ITI își asumă un rol activ în modernizarea educației prin conceptul STEAM, integrarea Inteligenței
          Artificiale în procesul didactic și dezvoltarea competențelor profesionale pentru elevi, studenți și cadre
          didactice. Motto-ul de perspectivă rămâne valabil: <strong>Ubi concordia, ibi victoria.</strong>
        </p>
      </article>
    </${Section}>
  `;
}

function ContactPage({ onNotify }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((previousState) => ({
      ...previousState,
      [fieldName]: fieldValue
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error');
      onNotify('Completează toate câmpurile formularului.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setStatus('error');
      onNotify('Adresa de email introdusă nu este validă.');
      return;
    }

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    onNotify('Formular validat local. Poți conecta ulterior un backend real.');
  };

  return template`
    <${Section}
      title="Date de contact"
      note="Secțiune extinsă cu formular demo și validare locală pentru un flux mai avansat."
    >
      <div className="grid grid-2">
        <article className="card">
          <h3>Contact instituțional</h3>
          <p className="meta-line">Adresă: str. Ghenadie Iablocikin, 5, MD-2069, Chișinău</p>
          <p className="meta-line">Email: catedra.iti.ust@gmail.com</p>
          <p className="meta-line">Telefon: (022) 22-70-90; (022) 74-79-19</p>
          <p className="meta-line">Web: www.ust.md</p>
          <p className="meta-line">
            Facebook:${' '}
            <a
              href="https://www.facebook.com/profile.php?id=61575055871918"
              target="_blank"
              rel="noopener noreferrer"
              style=${{ color: 'var(--primary)', fontWeight: 600 }}
            >Catedra ITI — Facebook</a>
          </p>
          <iframe
            title="Locație str. Ghenadie Iablocikin 5, Chișinău"
            src="https://www.google.com/maps?q=str.+Ghenadie+Iablocikin+5,+MD-2069,+Chi%C8%99in%C4%83u,+Moldova&output=embed&z=17"
            width="100%"
            height="300"
            style=${{ border: 0, borderRadius: '12px', marginTop: '12px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen=${true}
          ></iframe>
          <p style=${{ marginTop: '6px', fontSize: '0.85rem' }}>
            <a href="https://www.google.com/maps/search/?api=1&query=str.+Ghenadie+Iablocikin+5%2C+MD-2069%2C+Chi%C8%99in%C4%83u%2C+Moldova" target="_blank" rel="noopener noreferrer">
              Deschide în Google Maps ↗
            </a>
          </p>
        </article>

        <article className="card">
          <h3>Formular solicitare (demo)</h3>
          <form className="contact-form" onSubmit=${handleSubmit}>
            <label>
              <span>Nume</span>
              <input
                type="text"
                className="input-control"
                value=${formData.name}
                onInput=${(event) => handleInputChange('name', event.target.value)}
                placeholder="Nume complet"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                className="input-control"
                value=${formData.email}
                onInput=${(event) => handleInputChange('email', event.target.value)}
                placeholder="exemplu@email.com"
              />
            </label>

            <label>
              <span>Mesaj</span>
              <textarea
                className="input-control text-area"
                rows="4"
                value=${formData.message}
                onInput=${(event) => handleInputChange('message', event.target.value)}
                placeholder="Scrie mesajul tău"
              ></textarea>
            </label>

            <button type="submit" className="button form-submit">Trimite (demo)</button>
            ${status === 'success'
              ? template`<p className="status-message success">Mesaj validat local cu succes.</p>`
              : null}
            ${status === 'error'
              ? template`<p className="status-message error">Completează corect câmpurile pentru a continua.</p>`
              : null}
          </form>
        </article>
      </div>
    </${Section}>
  `;
}

const PAGE_COMPONENTS = {
  home: HomePage,
  despre: AboutPage,
  profesori: ProfessorsPage,
  profesor: ProfessorDetailPage,
  studenti: StudentsPage,
  media: MediaPage,
  noutati: NoutatiPage,
  tendinte: TendintePerspectivePage,
  contact: ContactPage
};

function PageContent({ activePage, onNotify }) {
  const ActiveComponent = PAGE_COMPONENTS[activePage] || HomePage;
  const componentNeedsNotify = ActiveComponent === ProfessorsPage || ActiveComponent === ContactPage;

  return componentNeedsNotify
    ? template`<${ActiveComponent} onNotify=${onNotify} />`
    : template`<${ActiveComponent} />`;
}

function SiteFooter() {
  return template`
    <footer className="footer">
      <div className="container footer-inner">
        <p>© ${new Date().getFullYear()} Catedra Informatică și Tehnologii Informaționale</p>
        <p>React runtime optimizat, cu noutăți, profil profesori și lightbox galerie</p>
      </div>
    </footer>
  `;
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return template`
    <button
      type="button"
      className="floating-top"
      onClick=${() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Mergi sus"
    >
      ↑ Sus
    </button>
  `;
}

function Toast({ message }) {
  if (!message) {
    return null;
  }

  return template`
    <div className="toast" role="status" aria-live="polite">
      ${message}
    </div>
  `;
}

function App() {
  const activePage = getActivePageKey();
  const selectedTeacherForSeo = activePage === 'profesor' ? getTeacherById(getQueryParameter('id')) : null;
  const [theme, setTheme] = useState(getInitialTheme);
  const [visitCount] = useState(registerAndGetVisitCount);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimerReference = useRef(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    registerServiceWorkerIfPossible();
  }, []);

  useEffect(() => {
    updateSeoForPage(activePage, selectedTeacherForSeo);
  }, [activePage, selectedTeacherForSeo]);

  useEffect(() => {
    return () => {
      if (toastTimerReference.current) {
        window.clearTimeout(toastTimerReference.current);
      }
    };
  }, []);

  const notify = (message) => {
    setToastMessage(message);

    if (toastTimerReference.current) {
      window.clearTimeout(toastTimerReference.current);
    }

    toastTimerReference.current = window.setTimeout(() => {
      setToastMessage('');
    }, 2600);
  };

  return template`
    <div className="site-shell">
      <${SiteHeader}
        activePage=${activePage}
        theme=${theme}
        visitCount=${visitCount}
        onToggleTheme=${() =>
          setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'))}
      />
      <main style=${{ fontSize: '1.08rem', lineHeight: 1.65, letterSpacing: '0.01em' }}>
        <${PageContent} activePage=${activePage} onNotify=${notify} />
      </main>
      <${SiteFooter} />
      <${BackToTopButton} />
      <${Toast} message=${toastMessage} />
    </div>
  `;
}

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(template`<${App} />`);
}


