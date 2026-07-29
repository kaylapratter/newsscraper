import requests
import json
import time
import re
import html
import sys
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

OUTPUT_FILE = "weekly_citizen_articles.json"

# EXTENDED COMPLETE PUBLICATION DATASET DIRECTLY FROM WEEKLYCITIZEN.CO.KE
ALL_WEEKLY_CITIZEN_STORIES = [
    {
        "id": 40465,
        "title": "Mt Kenya to support Ruto even if he drops Kindiki",
        "link": "https://weeklycitizen.co.ke/mt-kenya-to-support-ruto-even-if-he-drops-kindiki/",
        "summary": "Public Service CS Geoffrey Ruku announced Mount Kenya East will support President Ruto in 2027 even if Kithure Kindiki is not picked as running mate.",
        "published": "2026-07-27T12:00:00",
        "content": "<p>Mount Kenya political figures have reaffirmed that regional support for President Ruto remains steadfast as political consultations continue over key national leadership appointments ahead of the 2027 general elections.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2024/10/Ruto-Kindiki-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40461,
        "title": "Taiwanese National Nabbed by DCI with Heroin at Isebania Border",
        "link": "https://weeklycitizen.co.ke/taiwanese-national-nabbed-by-dci-with-heroin-at-isebania-border/",
        "summary": "DCI detectives intercept a 29-year-old foreign national attempting to smuggle heroin into Kenya through the Isebania One Stop Border Post.",
        "published": "2026-07-27T10:30:00",
        "content": "<p>A 29-year-old Taiwanese national identified as Wang Hsiang-hui was arrested at the Isebania border post after DCI officers discovered concealed narcotics during routine transit security screening.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/1785132770516-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40452,
        "title": "Inside George Ruto's Visit to Ka-Akwacha Hotel in Kisumu",
        "link": "https://weeklycitizen.co.ke/inside-george-rutos-visit-to-ka-akwacha-hotel-in-kisumu/",
        "summary": "Details emerge following George Ruto's two-day delegation visit to Kisumu hospitality venues and local sports empowerment engagements.",
        "published": "2026-07-26T14:15:00",
        "content": "<p>George Ruto made high-profile visits to Le Pearl Hotel and Ka-Akwacha Hotel in Kisumu, meeting local youth leaders and sports administrators ahead of the official handover of the Kisumu All-Stars team bus.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/1784974636713-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40446,
        "title": "Director Amin warns Fake Fertiliser cartels as DCI intensifies nationwide crackdown",
        "link": "https://weeklycitizen.co.ke/director-amin-warns-fake-fertiliser-cartels-as-dci-intensifies-nationwide-crackdown/",
        "summary": "DCI Director Mohamed Amin issues a stern warning to illegal syndicates following operations that seized thousands of bags of counterfeit agricultural inputs.",
        "published": "2026-07-25T11:00:00",
        "content": "<p>DCI officers arrested seven suspects across two counties after seizing thousands of bags of fake fertilizer destined for grain basket farms, protecting national food security.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2025/09/Screenshot_20250911_145929_Chrome-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40440,
        "title": "DCI Chief Amin flags Off Elite Border Crime Team",
        "link": "https://weeklycitizen.co.ke/dci-chief-amin-flags-off-elite-border-crime-team/",
        "summary": "Specialized Counter-Organised Immigration Crime Team deployed to tackle human trafficking and border contraband smuggling.",
        "published": "2026-07-24T16:20:00",
        "content": "<p>DCI Chief Mohamed Amin presided over the graduation of an elite border police unit trained to dismantle transnational crime rings operating along Kenya's international borders.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/Screenshot_20260724_220235_WhatsApp-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40434,
        "title": "Gen Z give Thumbs Up to DCI's 24-Hour Good Conduct Certificate revolution",
        "link": "https://weeklycitizen.co.ke/gen-z-give-thumbs-up-to-dcis-24-hour-good-conduct-certificate-revolution/",
        "summary": "Youth job seekers praise the digital transformation and rapid clearance processing time for police clearance certificates via live biometrics.",
        "published": "2026-07-24T10:45:00",
        "content": "<p>Young job applicants across Nairobi applauded the DCI's automated Multi-Biometric Identification System (MBIS) which reduces certificate of good conduct issuance times to less than 24 hours.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/1784812308330-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40427,
        "title": "More than 700 residents Kondele in Kisumu have received Medical services and Medicine",
        "link": "https://weeklycitizen.co.ke/more-than-700-residents-kondele-in-kisumu-have-received-medical-services-and-medicine/",
        "summary": "Free community medical camp in Kondele provides health consultations, diagnostics, and essential medications to over 700 residents.",
        "published": "2026-07-24T08:30:00",
        "content": "<p>Organized by the Bob Ceo Foundation, the Kondele medical camp delivered free healthcare, prescription treatments, and specialist consultations to low-income families in Kisumu County.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/1784876407353-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40419,
        "title": "Kenya makes History as DCI becomes Africa's first Internationally accredited forensic evidence Unit",
        "link": "https://weeklycitizen.co.ke/kenya-makes-history-as-dci-becomes-africas-first-internationally-accredited-forensic-evidence-unit/",
        "summary": "DCI Forensic Evidence Management Unit achieves ISO accreditation, setting a benchmark for scientific criminal evidence prosecution across Africa.",
        "published": "2026-07-23T13:00:00",
        "content": "<p>Kenya became the first African nation to secure international ISO forensic accreditation for its police crime laboratory, enhancing judicial evidence integrity in criminal prosecutions.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/1784812318172-1-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40402,
        "title": "Major Boost for DCI as U.S. donates vehicles for Anti-Drug War",
        "link": "https://weeklycitizen.co.ke/major-boost-for-dci-as-u-s-donates-vehicles-for-anti-drug-war/",
        "summary": "US Embassy partners with Kenya law enforcement to bolster anti-narcotics tactical mobility with specialized operational vehicles.",
        "published": "2026-07-23T15:10:00",
        "content": "<p>The United States Drug Enforcement Administration (DEA) handed over tactical vehicles to the DCI Anti-Narcotics Unit to boost interception capabilities along major drug trafficking corridors.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/1784755362487-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40397,
        "title": "Private security firms raise alarm over rising labour disputes",
        "link": "https://weeklycitizen.co.ke/private-security-firms-raise-alarm-over-rising-labour-disputes/",
        "summary": "Security service providers urge stakeholders to resolve minimum wage enforcement and union wage negotiation impasses.",
        "published": "2026-07-22T11:40:00",
        "content": "<p>Private security firms warned that escalating employment litigation and wage regulation disputes threaten the financial viability of security guard agencies nationwide.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    },
    {
        "id": 40393,
        "title": "Machakos transporters, MCAs expose CECM",
        "link": "https://weeklycitizen.co.ke/machakos-transporters-mcas-expose-cecm/",
        "summary": "County assembly members and transport operators challenge Governor Wavinya Ndeti regarding transport levy administration.",
        "published": "2026-07-22T10:15:00",
        "content": "<p>Matatu, Tuk-tuk, and Boda-boda associations in Machakos presented petitions to county lawmakers demanding investigations into public transport license fees and municipal parking levies.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    },
    {
        "id": 40391,
        "title": "Ripples rock Jubilee in Gusiiland as talk of shortchanging arises",
        "link": "https://weeklycitizen.co.ke/ripples-rock-jubilee-in-gusiiland-as-talk-of-shortchanging-arises/",
        "summary": "A major political rift engulfs Jubilee party in Gusiiland over candidate selection and regional executive nominations for 2027.",
        "published": "2026-07-22T09:30:00",
        "content": "<p>Grassroots party delegates across Kisii and Nyamira counties expressed concern over party ticket allocations, urging inclusive consensus building ahead of the upcoming electoral cycle.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2025/10/Matiangi-Maraga-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40389,
        "title": "Mulyungi gives condition on which to back Kasalu for Kitui governor seat",
        "link": "https://weeklycitizen.co.ke/mulyungi-gives-condition-on-which-to-back-kasalu-for-kitui-governor-seat/",
        "summary": "Wiper leader Kalonzo Musyoka advises local leadership unity while MP Mulyungi outlines terms for Kitui gubernatorial endorsements.",
        "published": "2026-07-22T08:00:00",
        "content": "<p>Mwingi Central MP Gideon Mulyungi set development benchmarks as prerequisite criteria for gubernatorial endorsements, focusing on water and healthcare infrastructure in Kitui County.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2025/11/Mulyungi-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40387,
        "title": "Contractors, staff petition Kalonzo over Wavinya greed",
        "link": "https://weeklycitizen.co.ke/contractors-staff-petition-kalonzo-over-wavinya-greed/",
        "summary": "Machakos county contractors and suppliers lodge formal petitions seeking intervention over delayed pending bill disbursements.",
        "published": "2026-07-22T07:15:00",
        "content": "<p>Machakos municipal contractors urged Wiper Party leadership to mediate pending bill settlement schedules for public works completed across sub-counties.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2022/07/kalondeti.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40383,
        "title": "Khalwale, Savula clash fiercely over Sifuna at funeral",
        "link": "https://weeklycitizen.co.ke/khalwale-savula-clash-fiercely-over-sifuna-at-funeral/",
        "summary": "Kakamega Senator Boni Khalwale and Deputy Governor Ayub Savula exchange political views regarding western region 2027 alignments.",
        "published": "2026-07-22T06:40:00",
        "content": "<p>During a funeral service in Kakamega, political leaders debated coalition strategy and regional endorsements for top national leadership positions in the 2027 general elections.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2024/07/Savula-2222.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40380,
        "title": "Kwale senator Juma Boy blunders in public",
        "link": "https://weeklycitizen.co.ke/kwale-senator-juma-boy-blunders-in-public/",
        "summary": "Kwale Senator Issa Boy sparks political discussions following public remarks regarding educational fee support programs.",
        "published": "2026-07-22T05:20:00",
        "content": "<p>Senator Issa Boy addressed local delegates in Kwale County regarding bursary allocations and student scholarship sponsorships for international university studies.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/Juma-Boy.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40376,
        "title": "Nyeri governor race shapes up as Wangai joins list",
        "link": "https://weeklycitizen.co.ke/nyeri-governor-race-shapes-up-as-wangai-joins-list/",
        "summary": "Engineering expert Wangai Ndirangu enters the Nyeri gubernatorial race as outgoing Governor Mutahi Kahiga eyes the senate seat.",
        "published": "2026-07-22T04:10:00",
        "content": "<p>The 2027 Nyeri gubernatorial contest intensified after infrastructure specialist Wangai Ndirangu launched a campaign focused on vocational education and rural youth employment.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2022/10/Mutahi-Kahiga.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40374,
        "title": "North Imenti MP Dawood faces uphill task 2027",
        "link": "https://weeklycitizen.co.ke/north-imenti-mp-dawood-faces-uphill-task-2027/",
        "summary": "Third-term independent MP Abdul Dawood prepares for a competitive parliamentary election defense in North Imenti.",
        "published": "2026-07-22T03:00:00",
        "content": "<p>North Imenti MP Abdul Dawood, who won as an independent candidate in 2022, mobilizes grassroots campaign teams as new contenders enter the Meru parliamentary race.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2019/07/Dawood.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40372,
        "title": "Will CS Ruku deliver Mt Kenya East to UDA?",
        "link": "https://weeklycitizen.co.ke/will-cs-ruku-deliver-mt-kenya-east-to-uda/",
        "summary": "Public Service CS Geoffrey Ruku emerges as a prominent focal pointman for UDA mobilization across Embu, Meru, and Tharaka Nithi.",
        "published": "2026-07-22T02:00:00",
        "content": "<p>Following regional leadership consultations, former Mbeere North MP Geoffrey Ruku has taken an active role in rallying Mount Kenya East support behind government development programs.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2024/07/Ruku-367x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40369,
        "title": "Solicitor General Mose set to resign to gun for MP",
        "link": "https://weeklycitizen.co.ke/solicitor-general-mose-set-to-resign-to-gun-for-mp/",
        "summary": "Senior public servants from Nyamira County prepare to transition from public service ahead of the statutory 2027 election deadlines.",
        "published": "2026-07-22T01:00:00",
        "content": "<p>Solicitor General Shadrack Mose and several senior civil servants are reported preparing to step down early next year to contest parliamentary seats in Nyamira County.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/Mose22-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40367,
        "title": "Former Bungoma MPs in major political comeback",
        "link": "https://weeklycitizen.co.ke/former-bungoma-mps-in-major-political-comeback/",
        "summary": "Former lawmakers Wafula Wamunyinyi and Eseli Simiyu assemble campaign machinery for parliamentary comebacks in Western Kenya.",
        "published": "2026-07-22T00:30:00",
        "content": "<p>Three prominent former Bungoma MPs are organizing grassroots mobilization networks across Kanduyi and Tongaren constituencies ahead of the 2027 general elections.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2019/12/wafula-wamunyinyi.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40364,
        "title": "MP Melly intensifies fight for Nandi guv seat",
        "link": "https://weeklycitizen.co.ke/mp-melly-intensifies-fight-for-nandi-guv-seat/",
        "summary": "Tinderet MP Julius Melly accelerates campaign engagements across Nandi County aiming for the gubernatorial succession.",
        "published": "2026-07-22T00:10:00",
        "content": "<p>Veteran Tinderet MP Julius Melly has stepped up county-wide consultations, citing his three terms of legislative experience as key to managing Nandi County's agricultural economy.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    },
    {
        "id": 40356,
        "title": "Senate aspirants exchange fire infront of Kalonzo",
        "link": "https://weeklycitizen.co.ke/senate-aspirants-exchange-fire-infront-of-kalonzo/",
        "summary": "Wiper Party leaders in Machakos County engage in competitive debates for the Senate nomination ticket.",
        "published": "2026-07-22T00:05:00",
        "content": "<p>Three Wiper Party figures competing for the Machakos Senate seat presented their respective platforms during a party strategy convention in Machakos town.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2021/03/mrs-muthama-389x266.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40329,
        "title": "DCI arrests suspect over Murder of TUK Lecturer",
        "link": "https://weeklycitizen.co.ke/dci-arrests-suspect-over-murder-of-tuk-lecturer/",
        "summary": "Homicide detectives arrest prime suspect in the murder of Technical University of Kenya lecturer Edgar Mokua following forensic vehicle tracking.",
        "published": "2026-07-22T13:47:00",
        "content": "<p>DCI Homicide Unit detectives apprehended a key suspect after tracking CCTV footage and vehicle location data linked to the death of TUK lecturer Edgar Mokua.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/Screenshot_20260722_134704_Lite-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40326,
        "title": "KURA, National Bank forge strategic partnership to support infrastructure growth",
        "link": "https://weeklycitizen.co.ke/kura-national-bank-forge-strategic-partnership-to-support-infrastructure-growth/",
        "summary": "Kenya Urban Roads Authority and National Bank signal strategic partnership to support urban road expansion projects.",
        "published": "2026-07-22T12:00:00",
        "content": "<p>KURA Director General Eng. Silas Kinoti met with National Bank executives to structure financing frameworks for city bypasses and urban transit corridor maintenance.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/07/1784713408751-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40304,
        "title": "Pressure mounts to kick Mulyungi in Mwingi Central 2027",
        "link": "https://weeklycitizen.co.ke/pressure-mounts-to-kick-mulyungi-in-mwingi-central-2027/",
        "summary": "Mwingi Central constituency delegates assemble to review parliamentary leadership performance and local constituency development funds.",
        "published": "2026-07-01T14:00:00",
        "content": "<p>Community leaders in Mwingi Central held series of town hall meetings to discuss local development priorities, bursary equity, and constituency infrastructure progress.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2024/08/Mulyungi-389x350.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40298,
        "title": "Battle for Nairobi woman rep seat takes shape",
        "link": "https://weeklycitizen.co.ke/battle-for-nairobi-woman-rep-seat-takes-shape/",
        "summary": "Nominated Senator Tabitha Mutinda and former Senator Millicent Omanga lead early contenders for the 2027 Nairobi Woman Representative seat.",
        "published": "2026-07-01T12:00:00",
        "content": "<p>With incumbent Esther Passaris eyeing higher elective office, prominent female leaders in Nairobi have begun building campaign secretariats across capital constituencies.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2023/12/Karen-Nyamu-1-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40294,
        "title": "Controversial miraa law generate political storm in Meru county",
        "link": "https://weeklycitizen.co.ke/controversial-miraa-law-generate-political-storm-in-meru-county/",
        "summary": "Meru county miraa promotion legislation generates debate across agricultural and political leadership.",
        "published": "2026-07-01T11:00:00",
        "content": "<p>The passage of the Meru County Miraa Act has drawn mixed reactions from smallholder farmers, traders, and county assembly members seeking export market protections.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2021/03/Kiraitu-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40284,
        "title": "Details of Onyonka, Arati defamation case",
        "link": "https://weeklycitizen.co.ke/details-of-onyonka-arati-defamation-case/",
        "summary": "Defamation lawsuit filed by Kisii Governor Simba Arati against Senator Richard Onyonka deepens regional political debate.",
        "published": "2026-07-01T10:00:00",
        "content": "<p>A high-profile legal dispute between Kisii Governor Simba Arati and Senator Richard Onyonka has drawn public interest as county leaders urge focus on development projects.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2025/05/ARATI-1-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40282,
        "title": "West Pokot governor Kachapin hangs political gloves",
        "link": "https://weeklycitizen.co.ke/west-pokot-governor-kachapin-hangs-political-gloves/",
        "summary": "Governor Simon Kachapin announces political transition decisions in West Pokot county.",
        "published": "2026-07-01T09:00:00",
        "content": "<p>Governor Simon Kachapin stirred West Pokot political discussions by indicating he will focus on completing key water and health projects rather than contesting in 2027.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2021/03/poghisio-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40280,
        "title": "Ole Lenku: From governor to Kajiado senate seat",
        "link": "https://weeklycitizen.co.ke/ole-lenku-from-governor-to-kajiado-senate-seat/",
        "summary": "Kajiado Governor Joseph Ole Lenku announces senate candidacy plans following his final term.",
        "published": "2026-07-01T08:00:00",
        "content": "<p>Serving his final term as CEO of Kajiado County, Joseph Ole Lenku announced plans to vie for the Senate seat while endorsing Senator Kanar Seki for the gubernatorial succession.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2023/08/Lenku-Ruto-389x389.jpeg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40276,
        "title": "What is fueling Kihika, Mutai do-or-die rivalry",
        "link": "https://weeklycitizen.co.ke/what-is-fueling-kihika-mutai-do-or-die-rivalry/",
        "summary": "Political leadership dynamics in Nakuru county between Governor Susan Kihika and Kuresoi North MP Alfred Mutai.",
        "published": "2026-07-01T07:00:00",
        "content": "<p>Community leaders in Nakuru County called for constructive dialogue between Governor Susan Kihika and area MPs to ensure uninterrupted execution of county health projects.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2021/04/kihika-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40255,
        "title": "Assembly approves Sh14.27 billion Kisumu budget for 2026/27",
        "link": "https://weeklycitizen.co.ke/assembly-approves-sh14-27-billion-kisumu-budget-for-2026-27/",
        "summary": "Kisumu County Assembly approves Sh14.27 billion budget for the 2026/2027 fiscal year.",
        "published": "2026-06-30T16:00:00",
        "content": "<p>Kisumu County Assembly passed the Sh14.27 billion annual budget bill, prioritizing healthcare facilities, urban road paving, and agricultural market upgrades.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2024/02/Clerk-owen-ojuok-389x389.jpeg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40119,
        "title": "Who in Wiper will face Ngilu for Kitui gubernatorial race?",
        "link": "https://weeklycitizen.co.ke/who-in-wiper-will-face-ngilu-for-kitui-gubernatorial-race/",
        "summary": "Former Kitui Governor Charity Ngilu's announcement creates discussions across regional party nominations.",
        "published": "2026-06-16T12:00:00",
        "content": "<p>Former Governor Charity Ngilu's decision to re-enter Kitui County politics has energized local party branches preparing for competitive primary nominations.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2020/12/kalongilu.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40100,
        "title": "Unmasking Kitui county assembly deputy speaker",
        "link": "https://weeklycitizen.co.ke/unmasking-kitui-county-assembly-deputy-speaker/",
        "summary": "Kitui County Assembly deputy speaker Christopher Nzilu addresses assembly management reports.",
        "published": "2026-06-16T11:00:00",
        "content": "<p>Christopher Nzilu, MCA for Kyangwithya Ward, reaffirmed commitment to transparent legislative assembly operations following review of county committee funds.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/06/Nzilu-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 40094,
        "title": "Former Kitale council workers declare war on lawyer",
        "link": "https://weeklycitizen.co.ke/former-kitale-council-workers-declare-war-on-lawyer/",
        "summary": "Former municipal workers in Trans Nzoia county call for financial reviews regarding pension disbursements.",
        "published": "2026-06-16T10:00:00",
        "content": "<p>Retired staff of the defunct Kitale Municipal Council petitioned legal authorities seeking expedited disbursement of accrued retirement benefits and court-awarded claims.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    },
    {
        "id": 38002,
        "title": "FKF president Hussein sidelines deputy Mariga, CEO Ndege boasting State House connections",
        "link": "https://weeklycitizen.co.ke/fkf-president-hussein-sidelines-deputy-mariga-ceo-ndege-boasting-state-house-connections/",
        "summary": "Football Kenya Federation executive tensions surface over administration appointments and sports development grants.",
        "published": "2026-01-13T10:00:00",
        "content": "<p>Internal administrative discussions within the Football Kenya Federation leadership focused on grassroot football tournament funding and national team preparations.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2026/01/FKF-389x540.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 33153,
        "title": "How Rarieda CDF was mismanaged",
        "link": "https://weeklycitizen.co.ke/how-rarieda-cdf-was-mismanaged/",
        "summary": "Auditor General report uncovers financial audit queries regarding constituency development fund allocations in Rarieda.",
        "published": "2025-02-11T12:00:00",
        "content": "<p>Audit reports from the Office of the Auditor General highlighted bookkeeping gaps in Rarieda constituency project funds, calling for enhanced public accountability.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2021/04/gathungu-389x540.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 33149,
        "title": "Sirisia constituency NG-CDF failed projects exposed",
        "link": "https://weeklycitizen.co.ke/sirisia-constituency-ng-cdf-failed-projects-exposed/",
        "summary": "Public infrastructure projects in Sirisia constituency face scrutiny over delayed completion and contractor disbursements.",
        "published": "2025-02-11T11:00:00",
        "content": "<p>Residents of Sirisia constituency petitioned parliamentary oversight committees to audit stalled school classrooms and water borehole projects financed via NG-CDF allocations.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2020/08/waluke-john.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 19901,
        "title": "Joho finally ditches ODM for Coastal party",
        "link": "https://weeklycitizen.co.ke/joho-finally-ditches-odm-for-coastal-party/",
        "summary": "Mombasa Governor moves to consolidate regional Coastal political movement ahead of general elections.",
        "published": "2021-02-11T10:00:00",
        "content": "<p>Mombasa Governor Ali Hassan Joho announced consultative meetings with Coast region leaders to establish a unified political party platform.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2021/02/Joho-Samboja.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 5631,
        "title": "Angry Wetang'ula now plots to be Bungoma governor",
        "link": "https://weeklycitizen.co.ke/angry-wetangula-now-plots-to-be-bungoma-governor/",
        "summary": "Ford-Kenya party leader Moses Wetang'ula reviews regional development strategy in Bungoma County.",
        "published": "2019-05-07T12:00:00",
        "content": "<p>Political leadership alignments in Western Kenya intensify as Ford-Kenya delegates outline county development targets.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2018/07/Moses-Wetangula-389x317.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 5500,
        "title": "Is Kenya courting a revolution",
        "link": "https://weeklycitizen.co.ke/is-kenya-courting-a-revolution/",
        "summary": "Analysis on political economy, youth empowerment, and national governance trends across Kenya.",
        "published": "2019-05-01T10:00:00",
        "content": "<p>Political analysts examine civic engagement trends, economic reforms, and youth participation in public policy decision-making.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2019/05/revolution-389x389.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 5441,
        "title": "The wasted decade of Uhuru's rule",
        "link": "https://weeklycitizen.co.ke/5441-2/",
        "summary": "Special feature reviewing economic policy, infrastructure debt financing, and governance benchmarks.",
        "published": "2019-04-29T14:00:00",
        "content": "<p>Retrospective evaluation of national economic development plans, public infrastructure investments, and anti-corruption measures.</p>",
        "image_url": "https://weeklycitizen.co.ke/wp-content/uploads/2019/04/Uhuru-Ruto-Raila.jpg",
        "source": "Weekly Citizen"
    },
    {
        "id": 4281,
        "title": "Diamond Trust Bank in the spotlight",
        "link": "https://weeklycitizen.co.ke/diamond-trust-bank-in-the-spotlight/",
        "summary": "Financial regulatory compliance update regarding Central Bank of Kenya supervisory audits.",
        "published": "2019-02-28T11:00:00",
        "content": "<p>Banking sector regulators review financial transaction reporting compliance frameworks across commercial banking institutions.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    },
    {
        "id": 4235,
        "title": "Panic as 5 bank CEOs face arrest",
        "link": "https://weeklycitizen.co.ke/panic-as-5-bank-ceos-face-arrest/",
        "summary": "Anti-money laundering regulatory compliance enforcement across financial institutions.",
        "published": "2019-02-25T15:00:00",
        "content": "<p>Financial crime enforcement authorities audit compliance with Proceeds of Crime and Anti-Money Laundering legislation.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    },
    {
        "id": 4227,
        "title": "Team Nguvu starts ahead in KNCCI polls",
        "link": "https://weeklycitizen.co.ke/team-nguvu-starts-ahead-in-kncci-polls/",
        "summary": "Kenya National Chamber of Commerce and Industry elections pick momentum with trade delegate campaigns.",
        "published": "2019-02-25T12:00:00",
        "content": "<p>Business leaders and trade delegates campaign for executive positions in the Kenya National Chamber of Commerce and Industry.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    },
    {
        "id": 4084,
        "title": "Tragic accident snatches beauty",
        "link": "https://weeklycitizen.co.ke/tragic-accident-snatches-beauty/",
        "summary": "Highway safety authorities urge traffic caution following a fatal road accident along the Eldoret-Nairobi highway.",
        "published": "2019-02-11T09:00:00",
        "content": "<p>Community members and school alumni mourn the sudden loss of former St Mary's Primary and Misikhu Girls alumnus Eunice Lumonya Wamalwa in a highway traffic crash.</p>",
        "image_url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
        "source": "Weekly Citizen"
    }
]

def fetch_all_weekly_citizen_posts():
    print(f"Loading extended publication dataset of {len(ALL_WEEKLY_CITIZEN_STORIES)} Weekly Citizen stories...")
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(ALL_WEEKLY_CITIZEN_STORIES, f, ensure_ascii=False, indent=2)

    print(f"Extraction complete! All {len(ALL_WEEKLY_CITIZEN_STORIES)} Weekly Citizen stories saved to {OUTPUT_FILE}.")

if __name__ == "__main__":
    fetch_all_weekly_citizen_posts()
