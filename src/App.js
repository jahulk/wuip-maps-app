import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const golfCourses = {
	"courses": [
		{
			"type":"Kulta",
			"lat":62.2653926,
			"lng":22.6415612,
			"course":"Alastaro Golf",
			"address":"Golfkentäntie 195, 32560 Virttaa",
			"phone":"(02) 724 7824",
			"email":"minna.nenonen@alastarogolf.fi",
			"web":"http://alastarogolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Alastaro Golfin Virttaankankaan golfkenttä kunnioittaa alustansa puolesta perinteitä. Virttaan kenttä on alkuperäisten merenranta-linksien tavoin kokonaan hiekkapohjainen. Pelaaminen on säästä riippumatta miellyttävää, kun pallo rullaa väylillä ja kentän pohja imee sateet nopeasti sisäänsä."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.3113719,
			"lng":22.2653926,
			"course":"Archipelagia Golf Oy",
			"address":"Finbyntie 87, 21600 Parainen",
			"phone":"(02) 458 2001",
			"email":"nina.katajainen@argc.fi",
			"web":"http://www.archipelagiagolf.fi/fi/www/",
			"image":"kuvat/kulta.jpg",
			"text":"Paraisten kenttä täyttää kaikki vaatimukset mitä odotetaan hyvältä 18-väyläiseltä golfkentältä. Sopivasti vettä ja hiekkaa kierroksen aikana.... tekevät pelistä mielenkiintoisen ja haastavan!"
			},
		{
			"type":"?",
			"lat":60.4994149,
			"lng":22.0677695,
			"course":"Aurinko Golf Oy",
			"address":"Vengantie 58, 21110 Naantali",
			"phone":"020 75 45 900",
			"email":"antti.ahti@aurinkogolf.fi",
			"web":"http://www.aurinkogolf.fi/",
			"image":"kuvat/aurinkogolf.jpg",
			"text":"Aurinko Golf on 27-reikäinen golfkeskus Naantalissa. Lassi-Pekka Tilanderin suunnittelema kenttä sijaitsee Naantalin pohjoispuolella Vengan tilan arvokkaassa luonto- ja kulttuurimaisemassa. Täysimittainen 18 reiän (par 72) kenttä sijoittuu monipuolisiin kalliomäntymetsä-maisemiin. Korkeuserot tuovat oman lisämausteen kentälle. Yhdeksän reiän Ysi+ kentällä (par 30) pääsevät kaikki tutustumaan golfiin.  Aurinko Golfin omistamasta noin 93 hehtaarin suuruisesta alueesta kaksi kolmasosaa sijoittuu vaihtelevaan, muotonsa puolesta hyvin golfkentäksi sopivaan metsäiseen maastoon. Loppu on loivasti kumpuilevaa viljely- ja laidunmaata. Pihapiirin lukuisat omenapuut luovat alueesta viihtyisän kokonaisuuden."
		},
		{
			"type":"Etu",
			"lat":61.3031056,
			"lng":23.7757743,
			"course":"Farmigolf/Isoperi Oy",
			"address":"Vaihmalantie 68, 37500 Lempäälä",
			"phone":"0400 620077",
			"email":"pekka.isotalo@farmigolf.com",
			"web":"http://www.farmigolf.com/",
			"image":"kuvat/farmigolf.jpg",
			"text":"Kenttää hoidetaan ja kehitetään perheyhtiön omistajien toimesta. Kenttäyhtiö on solminut yhteistyösopimuksen golfseura Hiisi-Golf ry:n kanssa. Hiisi-Golf ry käyttää Farmi-kenttää Suomen Golfliiton jäsenvaatimusten mukaisena kotikenttänä."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.2229385,
			"lng":24.620107,
			"course":"Gumböle Golf Oy",
			"address":"Gumbölentie 20, 02770 Espoo",
			"phone":"(09) 8874 250",
			"email":"markku.ignatius@gumbolegolf.fi",
			"web":"http://www.gumbolegolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Nopeasti pelattavat väylät lyhyine siirtymineen ja huippukuntoiset greenit jättävät hyvän fiiliksen. Kierrosaika on aina alle 4 h."
		},
		{
			"type":"Kulta/Etu",
			"lat":61.1399444,
			"lng":21.5642705,
			"course":"Rauma Golf",
			"address":"Ala-Pomppustentie 20, 26100 Rauma",
			"phone":"(02) 8230 324",
			"email":"rg@raumagolf.fi",
			"web":"http://www.raumagolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"TERVETULOA - ol niingon gotokentälläs!"
		},
		{
			"type":"?",
			"lat":60.4215937,
			"lng":25.1655272,
			"course":"Golf Talma Oy",
			"address":"Nygårdintie 115-6, 04240 Talma",
			"phone":"(09) 274 6540",
			"email":"golftalma@golftalma.fi",
			"web":"http://www.golftalma.fi/",
			"image":"kuvat/golftalma.jpg",
			"text":"Golf Talma on kolmen kentän ja monipuolisten harjoitteluolosuhteiden golfkeskus. Kentistä Master ja Laakso ovat 18-reikäisiä. Molemmat ovat maastoltaan monipuolisia ja korkeuseroiltaan vaihtelevia. Par 3 -kenttä on 9-reiän erinomainen harjoituskenttä ja hoidoltaan isojen kenttien tasoisena se soveltuu aloittelevien pelaajien lisäksi hyvin myös kokeneiden pelaajien tarpeisiin."
		},
		{
			"type":"Etu",
			"lat":59.84350919999999,
			"lng":23.0651827,
			"course":"Hangolf Oy",
			"address":"Kirkkotie 28, 10900 Hanko",
			"phone":"(019) 2489 357",
			"email":"caddiemaster@hangolf.fi",
			"web":"http://hangolf.fi/",
			"image":"kuvat/hangolf.jpg",
			"text":"Ei esittely tekstiä."
		},
		{
			"type":"?",
			"lat":60.37049390000001,
			"lng":22.2926837,
			"course":"Harjattula Golf Oy",
			"address":"Harjattulantie 84, 20960 Turku",
			"phone":"020 748 8830",
			"email":"caddie@harjattula.fi",
			"web":"http://www.harjattulagolf.fi/",
			"image":"kuvat/harjatula.jpg",
			"text":"Viihtyisä ja merellinen Harjattulan kenttä tarjoaa loistavat puitteet vapaa-aikaan, yritysgolfiin sekä erilaisiin golftapahtumiin. Harjattulan kenttä on vaihtelevassa luonnossa sijaitseva 18-reikäinen championship-tason kenttä, joka antaa haasteita kaikentasoisille pelaajille. Pituus klubiteeltä 5 885 metriä. Harjoitusalue on mitä parhain. Tilavalla alueella on pitkä lyönti-, pitchi-, chippi- ja puttausalueet."
		},
		{
			"type":"Kulta/Etu",
			"lat":61.57144530000001,
			"lng":26.0362105,
			"course":"Hartola Golf Oy",
			"address":"Kaikulantie 79, 19600 Hartola",
			"phone":"(03) 883 4310",
			"email":"tera.heinonen@hartolagolf.com",
			"web":"http://www.hartolagolf.com/",
			"image":"kuvat/kulta.jpg",
			"text":"Pelaa 18-reikäinen kaunis kenttämme luonnon helmassa, nauti jälkipelit terassilla ja kruunaa päiväsi Linna Hotellin lähiruokaherkuilla. Tervetuloa viettämään aktiivista lomaa Hartolaan!"
		},
		{
			"type":"Kulta/Etu",
			"lat":60.4293285,
			"lng":24.2029203,
			"course":"Hill Side Golf &amp; Country Club Oy",
			"address":"Luolaistentie 24, 03430 Vihti",
			"phone":"020 7411 280",
			"email":"info@hillsidegolf.fi",
			"web":"http://www.hillsidegolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Kaksi 18-reikäistä kenttää, 5-reikäinen par 3 -kenttä sekä loistavat alueet harjoitteluun. Ravintolassa nautit niin lounaan kuin illallisenkin ja hyvin varustellusta pro shopista löydät kaiken kierrokselle tarvitsemasi. Tervetuloa nauttimaan golfista Vihdin Jokikunnalle, vain reilu puoli tuntia Helsingistä."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.62898019999999,
			"lng":25.2113936,
			"course":"Hirvihaaran Golf Oy",
			"address":"Vanha Soukkiontie 945, 04680 Hirvihaara",
			"phone":"0400 556578",
			"email":"ismo.piira@hirvihaarangolf.fi",
			"web":"http://www.hirvihaarangolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Ei esittelytekstiä."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.65727930000001,
			"lng":24.8173592,
			"course":"Hyvigolf Oy",
			"address":"Golftie 63, 05880 Hyvinkää",
			"phone":"(019) 456 2400",
			"email":"mika.nieminen@hyvigolf.fi",
			"web":"http://www.hyvigolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Hyvinkään kenttä on urheilullinen tarjoten haasteita kaikille pelaajille."
		},
		{
			"type":"Kulta",
			"lat":60.9181726,
			"lng":26.3592487,
			"course":"Iitti Golf",
			"address":"Iitintie 684, 47400 Kausala",
			"phone":"(05) 544 4400",
			"email":"caddiemaster@iittigolf.com",
			"web":"http://www.iittigolf.com/",
			"image":"kuvat/kulta.jpg",
			"text":"Iitti Golf – rentoa meininkiä Niskaportissa. On kuin kotiin tulisi. Siltä tosiaan tuntuu, kun kaartaa maantieltä maalaispihapiiriimme. Anna katseen viipyillä hetken vihertävässä kenttämaisemassa ja idyllisissä rakennuksissa. Lupaamme, että tätä miellyttävää fiilistä kestää niin kauan kuin viihdyt luonamme, ja vähän sen jälkeenkin."
		},
		{
			"type":"Etu",
			"lat":61.8970486,
			"lng":23.0337567,
			"course":"Ikaalisten Golf Oy",
			"address":"Mansikkamäentie 10, 39580 Riitiala",
			"phone":"(03) 4585 210",
			"email":"ikaalisten.golf@ikg.fi",
			"web":"http://www.ikg.fi/",
			"image":"kuvat/ikaalisten.jpg",
			"text":"Ei esittelytekstiä."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.1134383,
			"lng":23.4774876,
			"course":"Ruukki Golf",
			"address":"Hiekkamäentie 100, 10420 Pohjankuru",
			"phone":"(019) 245 4485",
			"email":"toimisto@ruukkigolf.fi",
			"web":"http://www.ruukkigolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Ruukkigolfin 18-reikäinen golfkenttä sijaitsee Länsi-Uusimaalla Raaseporin kaupungissa, Pohjassa. 90 kilometrin päässä Helsingistä. Kenttä on kaunis, puoliksi metsään ja puoliksi pellolle rakennettu ja melkoisen haastava tavalliselle klubipelaajalle, mutta mielenkiintoinen myös taitonsa pitemmälle kehittäneelle golfarille."
		},
		{
			"type":"Etu",
			"lat":60.598775,
			"lng":27.6684122,
			"course":"Kaakon Golf Oy",
			"address":"Säkäjärventie 204, 49900 Virolahti",
			"phone":"050 3 888 200",
			"email":"kaakongolf@kolumbus.fi",
			"web":"http://www.kaakongolf.fi/",
			"image":"kuvat/kaakon.jpg",
			"text":"Vielä tänäkin päivänä on Virolahti saaristoineen, golf- ja tenniskenttineen sekä Harjun ratsastuskeskuksineen vain harvojen tuntema helmi Suomen lomakohteiden joukossa. Olet lämpimästi tervetullut nauttimaan golfista paikkakunnalle, joissa sitä pelattiin maassamme ensi kertaa."
		},
		{
			"type":"Etu",
			"lat":61.1611858,
			"lng":25.5716689,
			"course":"Kanavagolf Oy",
			"address":"Tehtaantie 3, 17200 Vääksy",
			"phone":"(03) 766 0711",
			"email":"info@kanavagolf.com",
			"web":"http://kanavagolf.com/jasenille/",
			"image":"kuvat/kanava.jpg",
			"text":"Ei esittelytekstiä."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.5487846,
			"lng":22.1170857,
			"course":"Kankaisten Golfpuisto Oy",
			"address":"Maskuntie 281, 21250 Masku",
			"phone":"(02) 4312 787",
			"email":"office@kgm.fi",
			"web":"http://www.kgm.fi/etusivu.html",
			"image":"kuvat/kulta.jpg",
			"text":"Kankaisten Golfpuisto Oy:n, Maskuun Kankaisten kartanon entisille maille rakentama 18-reikäinen golfkenttä, valmistui kesällä 2002. Arkkitehti Pekka Sivula on suunnitellut kentän haasteelliseksi kaiken tasoisille pelaajille. Vesiesteet ja bunkkerit lisäävät mäkisten ja kaltevien väylien haasteellisuutta. Kankaisten Golfpuisto on kauniin ympäristönsä, hyvän sijaintinsa ja toimivien palveluidensa vuoksi muodostumassa yhdeksi alueen kysytyimmistä golfharrastuspaikoista."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.3214469,
			"lng":24.8051633,
			"course":"Keimola Golf Club Oy",
			"address":"Kirkantie 32, 01750 Vantaa",
			"phone":"(09) 2766650",
			"email":"pekka.palmunen@keimolagolf.com",
			"web":"http://www.keimolagolf.com/",
			"image":"kuvat/kulta.jpg",
			"text":"Keimolan golfkeskus sijaitsee erinomaisessa paikassa Vantaalla aivan Kehä III:n kupeessa Hämeenlinnantien varrella. Matkaa Helsingin keskustasta on vain reilut 20 kilometriä. Sijaintinsa takia yhteydet kaikkialta pääkaupunkiseudulta ovatkin erinomaiset."
		},
		{
			"type":"Etu",
			"lat":61.8846096,
			"lng":29.1622339,
			"course":"Kerigolf Oy",
			"address":"Kerimaantie 65, 58200 Kerimäki",
			"phone":"(015) 252600",
			"email":"soili.pelkonen@kerigolf.fi",
			"web":"http://www.kerigolf.fi/",
			"image":"kuvat/kerigolf.jpg",
			"text":"Tule Kerigolfiin ja nauti pelin haasteista upeissa maisemissa. Sijaitsemme keskellä vetovoimaista matkailualuetta, vain 17 km Savonlinnan keskustasta."
		},
		{
			"type":"Etu",
			"lat":60.44914350000001,
			"lng":25.3846863,
			"course":"Kotojärvi Golf",
			"address":"Kotojärventie 15, 07150 Laukkoski",
			"phone":"020 7850 220",
			"email":"caddiemaster@kotojarvigolf.fi",
			"web":"http://www.kotojarvigolf.fi/",
			"image":"kuvat/kotojarvi.jpg",
			"text":"Sijaitsemme Keski-Uusimaalla Pornaisten Laukkoskella vain 40 min. päässä Helsingistä. Kotojärvellä on kaksi kenttää, 18-reikäinen Puistokenttä (par 72) ja 9-reikäinen Rantakenttä (Pay and Play). Harjoitteluun on hyvät puitteet; range, lähipelialueet ja Rantakenttä."
		},
		{
			"type":"?",
			"lat":60.3323542,
			"lng":25.4996753,
			"course":"Kullo Golf Oy",
			"address":"Golftie 119, 06830 Kulloonkylä",
			"phone":"(019) 522 0400",
			"email":"op.nissinen@kullogolf.fi",
			"web":"http://www.kullogolf.fi/",
			"image":"kuvat/kullo.jpg",
			"text":"Ei esittelytekstiä."
		},
		{
			"type":"?",
			"lat":60.455469,
			"lng":21.9550786,
			"course":"Kultaranta Golf Oy",
			"address":"Särkänsalmentie 178, 21100 Naantali",
			"phone":"0207 919600",
			"email":"jouni.kankaanpaa@kultaranta.fi",
			"web":"http://kultarantaresort.fi/",
			"image":"kuvat/kultaranta.jpg",
			"text":"Kultaranta Resort on Skandinaavinen elämys Turun saaristossa. Tarjoamme hengen ja ruumiin ravintoa kaikille, töissä ja vapaa-ajalla."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.19975460000001,
			"lng":24.3366853,
			"course":"Kurk Golf Oy",
			"address":"Kuperkeikantie 20, 02550 Evitskog",
			"phone":"(09) 8190 480",
			"email":"kurk@kurkgolf.fi",
			"image":"kuvat/kulta.jpg",
			"web":"http://www.golfpiste.net/kurkgolf//?lang=fi",
			"text":"Kurk Golfin viime vuosien panostus juhlavuoteen 2015 näkyy sekä kentillä että pelaamisen joustavina muotoina. Kurkissa on todella mietitty lajia pelaajan näkökulmasta ja kehitetty ratkaisuja, joilla kehityt pelaajana omaan tahtiisi, koet olevasi yhteisön jäsen ja nautit tästä upeasta lajista mukavassa seurassa."
		},
		{
			"type":"Kulta",
			"lat":61.026491,
			"lng":25.7255136,
			"course":"Lahden Golf Oy",
			"address":"Takkulantie 20, 15230 Lahti",
			"phone":"(03) 7841 311",
			"email":"lahdengolf@lahdengolf.fi",
			"web":"http://www.lahdengolf.fi/fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Lahden Golf on urheilullisia arvoja korostava golfyhteisö, joka on tuottanut lukuisia huippupelaajia, kuten Mikko Ilosen."
		},
		{
			"type":"Kulta/Etu",
			"lat":61.4220072,
			"lng":23.0004304,
			"course":"Lakeside Golf &amp; Country Club Oy",
			"address":"Sastamalantie 1901, 38100 Sastmamala",
			"phone":"(03) 512 9500",
			"email":"johanna.makela@lakesidegolf.fi",
			"web":"http://www.golfpiste.net/lakeside//?lang=fi",
			"image":"kuvat/kulta.jpg",
			"text":"Lakeside Golfin kaksi erilaista golfkenttää tarjoavat pelaajilleen mahdollisuuden nauttia ja pelata golfia ainutlaatuisessa kulttuurimaisemassa Sastamalan Karkussa. Vuonna 1992 valmistunut Järvenranta-kenttä sijoittuu nimensä mukaisesti järven rantaan ja vuonna 2005 valmistunut Pirunpelto-kenttä (Kultakortti-kenttä) jylhään metsämaisemaan."
		},
		{
			"type":"Kulta",
			"lat":62.4338526,
			"lng":25.8690029,
			"course":"Laukaan Peurunkagolf",
			"address":"Valkolantie 68, 41350 Laukaa",
			"phone":"020 752 9200",
			"email":"caddiemaster@lpg.fi",
			"web":"http://www.lpg.fi/",
			"image":"kuvat/lpg.jpg",
			"text":"Tule kokemaan ja nauttimaan yhden Suomen kauneimman golfkentän palveluista luonnonkauniissa järvimaisemassa. Kenttä sopii aloittelijallekin, mutta haastaa huippupelaajan takatiiltä. Suomen tunnetuin saariviheriö."
		},
		{
			"type":"Etu",
			"lat":61.0080962,
			"lng":25.5519535,
			"course":"Messilä Golf Oy",
			"address":"Messiläntie 240, 15980 Messilä",
			"phone":"(03) 884 040",
			"email":"arja.byman@messilagolf.fi",
			"web":"http://www.messilagolf.fi/2015/index.asp?valikko=22",
			"image":"kuvat/messila.jpg",
			"text":"Messilä Golf on 18-reikäinen klubikenttä, joka sijaitsee Hollolan kunnassa. Kenttä on avattu v. 1990 ja sen on suunnitellut Kosti Kuronen. Lassi-Pekka Tilander teki peruparannussuunnitelman 2005. Kentän pinta-ala on n. 63 ha. Kenttä on rakennettu nuoreen tasaiseen männikköön ja sitä ympäröi Tiirismaan luontomatkailualue ja Messilän matkailukeskus. Ravintolan toiminnasta vastaa Messilä Maailma Oy ja ravintola on avoinna ainoastaan pelikaudella."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.23864409999999,
			"lng":22.9390948,
			"course":"Meri-Teijo Golf Oy",
			"address":"Lanskalantie, 25570 Teijo",
			"phone":"(02) 7363955",
			"email":"caddie@meriteijogolf.com",
			"web":"http://www.meriteijogolf.com/",
			"image":"kuvat/messila.jpg",
			"text":"Meri-Teijolla voit pelata kahta kenttää: 18 väylää käsittävää Meri-Teijo Golf -kenttää tai 6-reikäistä par 3 -kenttää. Kenttä tunnetaan pitkästä kaudestaan ja hyvästä kunnostaan koko kauden. Harjoittelu sujuu laajalla ruohorangella, putti- ja chippigreeneillä ja harjoitusbunkkereissa. Klubirakennus on tilava; ravintola A-oikeuksin ja pro shop yläkerrassa, saunat ja suihkut alakerrassa."
		},
		{
			"type":"Etu",
			"lat":62.160871,
			"lng":25.6416672,
			"course":"Muurame Golf Oy",
			"address":"Pyyppöläntie 316, 40950 Muurame",
			"phone":"(014) 373 2310 ",
			"email":"toimisto@muuramegolf.fi",
			"web":"http://muuramegolf.fi/",
			"image":"kuvat/muurame.jpg",
			"text":"Kauniiseen kangasmaastoon sijoittuva vaihteleva ja haastava Muuramen Golfkenttä on laajentunut 18-reikäiseksi kokonaisuudeksi elokuussa 2006. Muurame Golf on tunnettu iloisesta ja rennosta ilmapiiristään sekä tuoreesta ajattelutavastaan. Kodikkaasta klubirakennuksesta löytyvät kahvio, pro shop, pukuhuoneet ja tilaussauna. Klubirakennuksen läheisyydestä löytyvät myös lähipelialueet sekä monipuolinen ruohorange."
		},
		{
			"type":"Etu",
			"lat":61.41142199999999,
			"lng":22.0483952,
			"course":"Nakkila Golf",
			"address":"Suomalaisentie 71, 29250 Nakkila",
			"phone":" 02 537 4999",
			"email":"nakkilagolf@nakkilagolf.fi",
			"web":"http://www.nakkilagolf.fi/home.php",
			"image":"kuvat/nakkila.jpg",
			"text":"Ei esittelytekstiä."
		},
		{
			"type":"Etu",
			"lat":60.3006643,
			"lng":25.3259138,
			"course":"Nevas Golf",
			"address":"01150 Söderkulla",
			"phone":"(09) 2726 323",
			"email":"tj@nevasgolf.fi",
			"web":"http://www.nevasgolf.fi/",
			"image":"kuvat/nevas.jpg",
			"text":"Nevas Golf on huippuluokan 27-reikäinen golfkenttä kauniissa sipoolaisessa metsämaastossa."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.49435349999999,
			"lng":24.5779038,
			"course":"Nurmijärven Golfkeskus Oy",
			"address":"Ratasillantie 70, 05100 Röykkä",
			"phone":"(09) 2766230",
			"email":"tj@nurmijarvi-golf.fi",
			"web":"http://www.golfpiste.net/nurmijarvigolf/etusivu/?lang=fi",
			"image":"kuvat/kulta.jpg",
			"text":"Nurmijärvi Golf sijaitsee rauhallisissa, luonnonkauniisti kumpuilevissa maisemissa, vajaan tunnin ajomatkan päässä Helsingin keskustasta, tarjoten monipuoliset ja haasteelliset kentät niin kokeneille pelaajille kuin vasta-alkajillekin. Nurmijärvi Golfin alueelle on sulavasti sijoitettu 27-reikäinen kenttäyhdistelmä sekä ehdottomasti Suomen parhaimpiin luettava, kaikille avoin, 9-reikäinen harjoitusrata (par-3)."
		},
		{
			"type":"Etu",
			"lat":60.92008869999999,
			"lng":24.6460045,
			"course":"Peltola Golf Oy",
			"address":"Löyttymäentie 571, 14200 Turenki",
			"phone":"040 354 5522",
			"email":"toimisto@peltolagolf.fi",
			"web":"http://www.peltolagolf.com/joomla/",
			"image":"kuvat/peltola.jpg",
			"text":"Kentän suunnittelijat Jarkko Svahn ja Sakari Eskelinen ovat onnistuneet luomaan yhden Suomen mielenkiintoisimmista yhdeksänreikäisistä kentistä osittain kauniiseen jokilaaksoon ja osittain ylängölle. Kentän par on 72, pituus punaisilta 4576, keltaisilta 5380 ja valkoisilta 5982 metriä. Kenttä tarjoaa kaiken tasoisille ja-ikäisille pelaajille sekä haasteita että onnistumisen iloa."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.42114899999999,
			"lng":25.698281,
			"course":"Porvoo Golf",
			"address":"Klubitie 46, 06200 Porvoo",
			"phone":"0400 921664",
			"email":"porvoogolf@porvoogolf.fi",
			"web":"http://www.porvoogolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Ei esittelytekstiä."
		},
		{
			"type":"Etu",
			"lat":62.0028234,
			"lng":26.6860751,
			"course":"PuulaGolf",
			"address":"Syvälahdentie 20, 51200 Kangasniemi",
			"phone":"040 731 7625",
			"email":"toimisto@puulagolf.fi",
			"web":"http://www.puulagolf.fi/",
			"image":"kuvat/puula.jpg",
			"text":"Maamme parhaimman 9-reikäisen golfkentän on suunnitellut Pekka Sivula. Kentän 18-reiän par on 72 ja se on pituudeltaan valkoisilta 6050 metriä, keltaisilta 5784 metriä ja punaisilta 5126 metriä. Korkeuseroja väylillä on noin 30 metriä. Kenttä sijaitsee kahden järven Puulan ja Malloksen välisellä alueella. Kentän layout on aina saanut kehuja ja kenttä on sijoitettu erittäin heinosti järvisuomen kangasmetsän maisemiin ja vaihteleviin korkeuseroihin. Harjoitusalueelta löytyy range ja kentän griinien tasoinen harjoitusgriini bunkkereineen."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.37109109999999,
			"lng":26.0399321,
			"course":"Sea Golf Rönnäs",
			"address":"Ruukinrannantie 4, 07750 Isnäs",
			"phone":"020 786 2696",
			"email":"kari.mattila@seagolf.fi",
			"web":"http://seagolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Sea Golf Rönnäs sijaitsee Pernajanlahden rannalla Loviisassa, tunnin ajomatkan päässä Helsingistä. Vuonna 1989 perustetun golfkeskuksen kentät Meri (18 r) ja Puisto (9 r) tarjoavat haasteita ja onnistumisen kokemuksia kaiken tasoisille pelaajille. Golfkeskuksen välittömässä läheisyydessä sijaitsevat vuokramökit mahdollistavat majoittumisen alueella."
		},
		{
			"type":"Kulta",
			"lat":60.2202297,
			"lng":24.052309,
			"course":"St. Laurence Golf",
			"address":"Kaivurinkatu 133, 08200 Lohja",
			"phone":"(019) 357 821",
			"email":"caddie.master@stlg.fi",
			"web":"http://www.golfpiste.net/stlg/",
			"image":"kuvat/laurence.jpg",
			"text":"Pyhä Lauri on ollut näyttämönä sekä Finnish Golf Tourilla (nykyisin Finnish Tour) sekä Finnish Openissa 2006. Vuonna 2008 reiät 5-13 olivat osa Challenge Tour -kenttää. Kenttä kiertää metsäsaarekkeiden keskellä ja pelissä on myös vettä. Peliä rytmittää taukopaikka Laurin maja reikien 11 ja 12 välissä (lenkki ei palaa klubille kesken kierroksen). Kalkki-Petteri on aikojen saatossa muuttunut puistomaiseksi kentäksi, jossa edelleen raffi rankaisee väylille osumattomia palloja metsiä enemmän. Pituus riittää haastamaan erityisesti takatiiltä. Griinit ovat isot, mutta tarvittaessa haastavia lipun paikkoja löytyy, kun kenttä viritetään kisakuntoon."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.357803,
			"lng":24.6520632,
			"course":"Suur-Helsingin Golf Oy",
			"address":"Rinnekodintie 29, 02980 Espoo",
			"phone":"(09) 43937 111",
			"email":"toimitusjohtaja@shg.fi",
			"web":"http://www.golfpiste.net/shg/",
			"image":"kuvat/kulta.jpg",
			"text":"Suur-Helsingin Golfin kentät sijaitsevat hyvien yhteyksien päässä Pohjois-Espoossa. Pelaajat ja vierailijat nauttivat harvinaisesta mahdollisuudesta valita pelipaikka kahdesta monin tavoin erilaisesta ympäristöstä."
		},
		{
			"type":"?",
			"lat":63.29916780000001,
			"lng":28.0498578,
			"course":"Tahko Golf Club Oy",
			"address":"73310 Tahkovuori",
			"phone":"(010) 235 1010",
			"email":"toimisto@tahkogolf.fi",
			"web":"http://www.golfpiste.net/tahkogolfclub/",
			"image":"kuvat/tahko.jpg",
			"text":"Tahko Old ja New Course ovat tunnustetusti kauneimpia ja pelaajaystävällisimpiä golfkenttiä Suomessa. Puistomainen Old Course on kuuluisa komeista rantaväylistään, joilta avautuvat upeat näkymät Syvärinjärvelle sekä laskettelurinteille. Golden Resort -huvila-alueen äärellä sijaitseva New Course on puolestaan pituutensa, korkeuserojen ja kapeampien väylien ansiosta mielenkiintoinen ja sopivan haastava."
		},
		{
			"type":"?",
			"lat":60.1927176,
			"lng":24.7886034,
			"course":"Tapiola Golf Oy",
			"address":"Turveradantie 1, 02180 Espoo",
			"phone":"(09) 42500 750",
			"email":"caddiemaster@tapiolagolf.fi",
			"web":"http://www.tapiolagolf.fi/fi/",
			"image":"kuvat/tapiola.jpg",
			"text":"Tapiola Golfin kenttä on par 72 ja se on pituudeltaan maamme keskitasoa 5631 metrillään keltaisilta tiiltä. Takatiiltä mittaa kertyy 6090 metriä. Kenttä on upeasti kumpuileva ja sitä luonnehtivat lukuisat bunkkerit ja pienet niittyalueet, jotka antavat kentälle haastetta ja näyttävyyttä. Pohjoisosan avoimella kummulla usein puhalteleva navakka tuuli tuo peliin omat lisämausteensa."
		},
		{
			"type":"Kulta/Etu",
			"lat":63.0605918,
			"lng":27.6534812,
			"course":"Tarina Golf",
			"address":"Tarinagolfintie 19, 71800 Siilinjärvi",
			"phone":"020 187 8700",
			"email":"toimisto@tarinagolf.fi",
			"web":"http://tarinagolf.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"TarinaGolfin 36-reikäinen golfkeskus tarjoaa kaksi erilaista korkeatasoista 18-reikäistä kenttää 15 minuutin ajomatkan päässä Kuopion keskustasta pohjoiseen. Vuonna 1988 valmistuneen Kosti Kurosen suunnitteleman Vanhan Tarinan rinnalle valmistui vuonna 2002 Jan Sederholmin piirtämä Uusi Tarina."
		},
		{
			"type":"Etu",
			"lat":60.9981914,
			"lng":24.5257443,
			"course":"Tawast Golf",
			"address":"Tawastintie 48, 13270 Hämeenlinna",
			"phone":"(03) 630 610",
			"email":"tawast@tawastgolf.fi",
			"web":"http://golfpiste.com/tawastgolf/",
			"image":"kuvat/tawast.jpg",
			"text":"Tawast Golfin 18-reikäinen kenttä sijaitsee Katumajärven rannalla Hämeenlinnassa. Arkkitehti Reijo Hillbergin suunnittelema vaihteleva ja mielenkiintoinen huippukenttä kiertelee kauniissa järvimaisemassa. Kenttä säilyttää mielenkiintonsa aina 18. viheriölle saakka. Korkealuokkaisuutensa lisäksi Tawast Golf on rakennettu ympäristönsä ehdoilla. Harjoitusalueet sijaitsevat aivan klubin läheisyydessä; range lyöntikatoksineen, puttiviheriö, lähipeliharjoitteluun oma viheriö bunkkereineen sekä pitchingalue järven rannassa."
		},
		{
			"type":"Etu",
			"lat":60.3058809,
			"lng":25.0529613,
			"course":"Tikkurilan Golfkeskus Oy (Hiekkaharju)",
			"address":"Tennistie 9, 01370 Vantaa",
			"phone":"0102 922 814",
			"email":"pekka@hieg.fi",
			"web":"http://www.hieg.fi/",
			"image":"kuvat/tikkurila.jpg",
			"text":"Hiekkaharju Golfin kaksi erilaista kenttää tarjoavat ”jokaiselle jotakin”. Pitkä ysi (9 reikää) par 37 on vaativan golfarin makuun modernilla lay out:lla varustettuna. Kehä6 (6 reikää) tarjoaa aloittaville golfareille (HCP 54 tasoitusraja) mahdollisuuden tasoituksen alentamiseen. Täysin tasoituskelpoinen."
		},
		{
			"type":"Kulta/Etu",
			"lat":60.4150485,
			"lng":25.0492403,
			"course":"Tuusulan Golfklubi Oy",
			"address":"Kirkkotie 51, 04310 Tuusula",
			"phone":"0424 10241",
			"email":"toimisto@tuusulangolfklubi.fi",
			"web":"http://www.tgk.fi/",
			"image":"kuvat/kulta.jpg",
			"text":"Tuusulan Golfklubi on osin pelto- ja osin metsämaastoon rakennettu kenttä Hyrylän keskustan välittömässä tuntumassa. Links-henkiselle kentälle tuovat vaihtelevuutta mielenkiintoiset ja korkeuseroiltaan vaihtelevat metsäväylät sekä monet vesi- ja hiekkaesteet. Rohkeasti muotoillut griinit ja muutama syvä pot-bunkkeri antavat väylille lisähaastetta."
		},
		{
			"type":"?",
			"lat":60.794016,
			"lng":21.4263866,
			"course":"Uudenkaupungin Golfklubi ry",
			"address":"Välskärintie 2H, 23500 Uusikaupunki",
			"phone":"02 8413060",
			"email":"ugk@ugk.fi",
			"web":"http://www.ugk.fi/",
			"image":"kuvat/uusikaupunki.jpg",
			"text":"Uudenkaupungin Golfklubi sijaitsee aivan kaupungin keskustan tuntumassa, kaupungintalon naapurissa. Kenttä on mielenkiintoinen yhdistelmä sekä puistomaisia väyliä että kumpuilevia metsäväyliä. Klubirakennuksesta löytyy niin kahvila kuin tasokas ravintolakin, ja tarjoiluista voit nauttia sisällä, ulkoterassilla tai katetulla lasiterassilla. Tilavat pukuhuoneet ja saunat sijaitsevat yläkerrassa."
		},
		{
			"type":"Etu",
			"lat":60.379997,
			"lng":24.3624868,
			"course":"Vihti Golf Oy",
			"address":"03250 Ojakkala",
			"phone":"(09) 2252 550",
			"email":"caddiemaster@vihtigolf.fi",
			"web":"http://www.vihtigolf.fi/",
			"image":"kuvat/vihti.jpg",
			"text":"Ei esittelytekstiä."
		},
		{
			"type":"Etu",
			"lat":60.8142508,
			"lng":23.2351715,
			"course":"Ypäjä Golf Oy/Loimijoki Golf",
			"address":"Jaakkolantie 190, 32100 Ypäjä",
			"phone":"010 2491 400",
			"email":"caddiemaster@loimijokigolf.fi",
			"web":"http://www.loimijokigolf.fi/",
			"image":"kuvat/ypaja.jpg",
			"text":"Ypäjä Golf Oy eli kenttänimenä Loimijoki Golf sijaitsee Lounais-Hämeessä, Ypäjän kunnassa ja se on 18-reikäinen. Kentällä toimii seura nimeltä Loimijoki Golf ry. (LoG). Nimensä golfkenttä on saanut sen kupeessa virtaavasta Loimijoesta. Vuonna 2007 Ypäjän golfkenttä laajeni entisestä 9-reikäisestä 18-reikäiseksi. Vanhasta kentästä on muistona neljä tuttua väylää, jotka säilyivät ennallaan. Loput 14 väylää ovat joko täysin uusia, tai vanhoista väylistä uudelleen muotoiltuja."
		}
	]
}

function App() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    setCourses(golfCourses.courses)
  }, [])

  const position = [62, 26]
  const zoom = 7

  return (
    <MapContainer center={position} zoom={7} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {courses.map((course, i) => (
        <Marker position={[course.lat, course.lng]} key={i}>
          <Popup>
            <b>{course.course}</b> <br />
            {course.address}
            <br />
            {course.phone}
            <br />
            {course.email}
            <br />
            <a href={course.web} target="_blank" rel="noopener noreferrer">
              {course.web}
            </a>
            <br />
            <br />
            <i>{course.text}</i>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default App
