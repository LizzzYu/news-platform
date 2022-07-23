import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import NewsCard from '../components/NewsCard';
import 'moment/locale/zh-tw';
import fetchNews from '../apis/news';
import { sideMenuConfig } from '../static/sideMenuConfig';

// const dummyData = {
//   status: 'ok',
//   totalResults: 34,
//   articles: [
//     {
//       source: {
//         id: null,
//         name: 'Technews.tw',
//       },
//       author: 'https://www.facebook.com/technewsinside/',
//       title:
//         '都感染登革熱了，竟然吸引更多蚊子叮咬| TechNews 科技新報 - TechNews 科技新報 ',
//       description:
//         '最近研究顯示，會導致登革熱（dengue ）和茲卡（Zika）等熱帶疾病的病毒竟然會改變宿主氣味，對蚊子更具吸引力。此現象意義在於，蚊子是傳播登革熱和茲卡病毒的主要媒介，而蚊子叮咬受感染的人類後，就可進一步攜帶病毒，並傳播至其他健康人類和動物。今年 6 月刊登於國際頂尖生物科學期刊《細胞》（Cell...',
//       url: 'https://technews.tw/2022/07/24/dengue-and-zika-virus-can-make-you-smell-tastier-to-mosquitoes/',
//       urlToImage:
//         'https://img.technews.tw/wp-content/uploads/2018/05/07145102/mosquitoe-1548975_1280-e1525675879410.jpg',
//       publishedAt: '2022-07-23T16:14:14Z',
//       content: '© 2013-2019 TechNews Inc. All rights reserved. | | | |',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Kmdn.gov.tw',
//       },
//       author: null,
//       title: '金門日報全球資訊網-【科幻沙龍】心‧星 - 金門日報',
//       description:
//         '「你快看！大白天竟然看得到那顆星星！」我指著東邊遠山上的藍天，突然向身旁的小薇大聲叫著，但是一喊完我就後悔了。\n  「啊！那是什麼星？」由於我的聲音太大，連旁邊的三個路人也被我嚇到，往我所指的方向看過去。\n  「飛機反光嗎？」「是鳥吧？」「鳥會移動啦！」「飛碟！」「是遙控無人機吧？」他們幾個也開始討論那是什麼。他們的吵嚷聲引得更多路人紛紛將眼光從手機螢幕移開並抬頭仰望，接著便吃驚地定住了視線。他們看到了一顆星星在藍天之中閃耀，沒有移動跡象，光線雖然不強卻有七彩變化，類似夜間看到天狼星那般閃爍不已，實在有點詭異。\n…',
//       url: 'https://www.kmdn.gov.tw/1117/1271/1274/545276/',
//       urlToImage: 'https://www.kmdn.gov.tw/media/131565/fblogo-ss.jpg',
//       publishedAt: '2022-07-23T16:07:24Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'YouTube',
//       },
//       author: null,
//       title:
//         '07/23 樂天VS 中信八局上，陳俊秀遭到三振後，外籍打擊教練鮑伊上場抗議，最後遭到主審驅逐出場 - CPBL 中華職棒',
//       description:
//         '中華職棒33年，鬥陣相挺!立即訂閱中華職棒CPBL官方YouTube頻道，不錯過每場比賽的精彩好球→http://bit.ly/2JKGTtd《CPBL中華職棒粉絲團》http://bit.ly/30QBUwb《追蹤IG還有更多訊息》http://bit.ly/2wn2m2B五隊全主場轉播請訂閱CPBLTV🎥h...',
//       url: 'https://www.youtube.com/watch?v=1fdKJf7sVT0',
//       urlToImage: 'https://i.ytimg.com/vi/1fdKJf7sVT0/maxresdefault.jpg',
//       publishedAt: '2022-07-23T13:51:59Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'udn 聯合新聞網',
//       },
//       author: '記者鄭國樑／桃園即時報導',
//       title: '酸林智堅？桃市府對面掛起「論文、抄襲」大看板 - udn.com',
//       description:
//         '「抄襲出包竹科扛？論文出包台大扛？市政出包基層扛！」，約四層樓高綠底白字的選舉廣告，今天上午掛在桃園市政府正對面的大樓外...',
//       url: 'https://udn.com/news/story/122924/6483238',
//       urlToImage:
//         'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2022/07/23/realtime/18122943.jpg&s=Y&x=100&y=0&sw=1080&sh=720&exp=3600',
//       publishedAt: '2022-07-23T13:43:24Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'Ettoday.net',
//       },
//       author: 'ETtoday新聞雲',
//       title:
//         '林志穎自撞火燒車！人妻機會教育「別管媽先跑」 兒崩潰2句惹哭網 - ETtoday新聞雲',
//       description:
//         '男神林志穎駕駛特斯拉Model X自撞起火，所幸遇上救命恩人，將他與6歲兒子拉出才死裡逃生。對此，一名人妻也藉此事件教育兒子，萬一發生類似情況時，一定要先解開自己的安全帶並下車逃生，「不用管媽媽」。不料兒子聽聞後竟立刻大哭，並抱著她說，「我怎麼可能不管妳，妳不要叫我不要管妳⋯」讓她聽了後瞬間覺得好笑又心酸酸的。(林志穎,自撞,火燒車)',
//       url: 'https://www.ettoday.net/news/20220723/2300789.htm',
//       urlToImage: 'https://cdn2.ettoday.net/images/6467/d6467787.jpg',
//       publishedAt: '2022-07-23T13:08:00Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'Yahoo Entertainment',
//       },
//       author: '閻紀宇',
//       title:
//         '不到24小時就毀約？俄羅斯才剛簽署運糧協議，飛彈攻擊烏克蘭黑海大港奧德薩 - Yahoo奇摩新聞',
//       description:
//         '烏克蘭與俄羅斯與烏克蘭22日在土耳其伊斯坦堡簽署《黑海倡議》，俄羅斯同意對烏克蘭黑海港口解除封鎖、暫停攻擊行動，恢復烏克蘭的糧食出口海運，...',
//       url: 'https://tw.news.yahoo.com/%E4%B8%8D%E5%88%B024%E5%B0%8F%E6%99%82%E5%B0%B1%E6%AF%80%E7%B4%84-%E4%BF%84%E7%BE%85%E6%96%AF%E6%89%8D%E5%89%9B%E7%B0%BD%E7%BD%B2%E9%81%8B%E7%B3%A7%E5%8D%94%E8%AD%B0-%E9%A3%9B%E5%BD%88%E6%94%BB%E6%93%8A%E7%83%8F%E5%85%8B%E8%98%AD%E9%BB%91%E6%B5%B7%E5%A4%A7%E6%B8%AF%E5%A5%A7%E5%BE%B7%E8%96%A9-124615605.html',
//       urlToImage:
//         'https://s.yimg.com/uu/api/res/1.2/3YxX9uVvmNQHg.xd7Tugsw--~B/aD00MDA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/stormmediagroup.com/6f66b6b48d95e59acd05786c622c192e',
//       publishedAt: '2022-07-23T12:46:15Z',
//       content:
//         '22\r\nSouthern Command232KalibrOdesa2\r\nOleg Nikolenko24Istanbul\r\nVasyl Bodnar\r\n2022722AP\r\n23150Vladimir PutinAntónio GuterresRecep Tayyip ErdoanBlack Sea Initiative\r\nMykola Solskyi\r\nChernomorskYuzhny\r\n… [+6 chars]',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Yahoo Entertainment',
//       },
//       author: 'Yahoo奇摩（即時新聞）',
//       title:
//         '大暑！台北飆38.3度熱到爆創今年新高紀錄 明18縣市高溫燈號 - Yahoo奇摩新聞',
//       description:
//         '農曆24節氣中的「大暑」到來，全台熱到爆，台北也飆高溫！中央氣象局觀測台北市今天高溫達攝氏38.3度，是台北氣象站今年以來最高紀錄，氣象局預測台北明天仍可能連續出現38度極端高溫。氣象局持續發布全台18縣市高溫燈號資訊，只有新竹市除外。',
//       url: 'https://tw.news.yahoo.com/%E5%A4%A7%E6%9A%91%EF%BC%81%E5%8F%B0%E5%8C%97%E9%A3%86-383-%E5%BA%A6%E7%86%B1%E5%88%B0%E7%88%86%E5%89%B5%E4%BB%8A%E5%B9%B4%E6%96%B0%E9%AB%98%E7%B4%80%E9%8C%84-%E6%98%8E%E9%98%B2%E6%A5%B5%E7%AB%AF%E9%AB%98%E6%BA%AB-124013652.html',
//       urlToImage:
//         'https://s.yimg.com/os/creatr-uploaded-images/2022-07/c8049350-0a83-11ed-bdf7-cbce809c1f82',
//       publishedAt: '2022-07-23T12:40:13Z',
//       content: '186.16(Babe Ruth)10461115',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Ltn.com.tw',
//       },
//       author: '自由時報',
//       title: '中職》「這輩子不會忘的比賽」 羅力成史上第4位百勝巨投 - 自由時報',
//       description:
//         '富邦悍將洋投羅力（Mike Loree），自2012年下半季來台效力Lamigo桃猿隊（現樂天桃猿）起，當中扣掉一季效力韓職，在台灣共效力10個賽季，今天在新竹球場面對味全龍隊，羅力以6局無失分佳績，奪下中職生涯百勝，是繼潘威倫、勇壯（Osvaldo Martinez）和謝長亨之後，中職史上第4人。',
//       url: 'https://sports.ltn.com.tw/news/breakingnews/4001983',
//       urlToImage:
//         'https://img.ltn.com.tw/Upload/sports/page/800S/2022/07/23/phpISlxhS.jpg',
//       publishedAt: '2022-07-23T12:28:00Z',
//       content: '© 2022 The Liberty Times. All Rights Reserved.',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Yahoo Entertainment',
//       },
//       author: 'CDNS V',
//       title: '冥王星「衝」 台北天文館繁星點點間覓得其蹤跡 - Yahoo奇摩新聞',
//       description:
//         '記者吳靈芬／台北報導 台北市立天文館廿三日指出，「九大行星」是所有卅歲以上民眾都耳熟能詳的名詞，不過其中最遙遠 […]',
//       url: 'https://tw.news.yahoo.com/%E5%86%A5%E7%8E%8B%E6%98%9F-%E8%A1%9D-%E5%8F%B0%E5%8C%97%E5%A4%A9%E6%96%87%E9%A4%A8%E7%B9%81%E6%98%9F%E9%BB%9E%E9%BB%9E%E9%96%93%E8%A6%93%E5%BE%97%E5%85%B6%E8%B9%A4%E8%B7%A1-122252088.html',
//       urlToImage:
//         'https://s.yimg.com/uu/api/res/1.2/u04a1cSrdrIHuNKt9AfEVQ--~B/aD01MTI7dz01NjQ7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/ko/cdns.com.tw/30b773e18c33252bc30fee5e5faf04ae',
//       publishedAt: '2022-07-23T12:22:52Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'udn 聯合新聞網',
//       },
//       author: '記者王郁惠／即時報導',
//       title: '潘瑋柏胖到人生巔峰93公斤 吃肥驚人照曝光 - United Daily News',
//       description:
//         '41歲男星潘瑋柏自出道以來，一直深受易胖體質困擾，174公分高的他，5月胖到人生巔峰93公斤，他曾自嘲唱Rap像「胖子在...',
//       url: 'https://stars.udn.com/star/story/10088/6483271',
//       urlToImage:
//         'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2022/07/23/1/18123008.jpg&s=Y&x=0&y=0&sw=1200&sh=800&sl=W&fw=800&exp=3600',
//       publishedAt: '2022-07-23T12:18:04Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'Ftvnews.com.tw',
//       },
//       author: '民視新聞網',
//       title:
//         '阿嬤吃東西沒味道！「狂戳鼻子2週」都陰性 醫師一驗秒揪背後真相 - 民視新聞網FTVn',
//       description:
//         '義大醫院家庭暨社區醫學部預防醫學科主任洪暐傑醫師，日前在臉書粉專「洪暐傑醫師的愛講空間」透露，有一名阿嬤長時間吃不出食物味道，家人都覺得很鹹或很甜的東西，對她來說吃起來都一樣，讓她頓時失去吃東西的樂趣。由於正值疫情期間，家人擔心她是確診新冠肺炎，才會失去味覺，因此阿嬤每天都自行快篩，時間長達2週，結果都是陰性，家人最後決定帶她就醫檢查。味覺改變的原因有很多種，建議盡快就醫檢查，才能及早揪出原因。（.....',
//       url: 'https://www.ftvnews.com.tw/news/detail/2022723W0159',
//       urlToImage:
//         'https://cdn.ftvnews.com.tw/manasystem/FileData/News/5adfeaf0-389b-4aa9-b1a3-daf97ac00f0c.jpg',
//       publishedAt: '2022-07-23T12:15:18Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'Yahoo Entertainment',
//       },
//       author: 'Yahoo奇摩（即時新聞）',
//       title:
//         '保時捷執行長接任福斯集團CEO 德汽車龍頭高層人事地震 - Yahoo奇摩新聞',
//       description:
//         '德國汽車龍頭福斯汽車集團（Volkswagen）高層人事地震！今天無預警宣布，在福斯汽車懷抱雄心企圖轉型走向發展電動車之際，任職4年的執行長迪斯（Herbert Diess）將退位，職缺將由跑車保時捷（Porsche）現任執行長布魯莫（Oliver Blume）接掌。',
//       url: 'https://tw.news.yahoo.com/%E4%BF%9D%E6%99%82%E6%8D%B7%E5%9F%B7%E8%A1%8C%E9%95%B7%E6%8E%A5%E4%BB%BB%E7%A6%8F%E6%96%AF%E9%9B%86%E5%9C%98ceo-%E5%BE%B7%E6%B1%BD%E8%BB%8A%E9%BE%8D%E9%A0%AD%E9%AB%98%E5%B1%A4%E4%BA%BA%E4%BA%8B%E5%9C%B0%E9%9C%87-115827519.html',
//       urlToImage:
//         'https://s.yimg.com/ny/api/res/1.2/v8_VG4dYnFtxUzWeb4ii.g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2022-07/68487710-0a7e-11ed-bffe-b7e606f80932',
//       publishedAt: '2022-07-23T11:58:27Z',
//       content: '(23)22,595COVID-1922,34724853...',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Ltn.com.tw',
//       },
//       author: '自由時報',
//       title: '挨批負面選戰 張善政：我沒說論文有問題 - 自由時報',
//       description:
//         '國民黨桃園市長參選人張善政今晚受邀出席黃埔軍校四海同心會聯誼活動，退將、榮團席開七桌餐敘，「凍蒜」喊得震天價響，象徵軍系力挺張善政，張受訪談及綠營稱他打負面選戰「從頭到尾沒有惡意批評，直言論文有問題，只要林智堅說清楚」。先前桃園市黃國園黨部公開表態力挺立委呂玉玲，呂因「朱中央」參選無望後，黃國園轉彎改挺張善政，主委蔡忠誠也一表忠誠，他說「黃國園會當最強後盾，從一開始就是，不是今天、不是最近才開始」。',
//       url: 'https://news.ltn.com.tw/news/politics/breakingnews/4001949',
//       urlToImage:
//         'https://img.ltn.com.tw/Upload/news/600/2022/07/23/4001949_1_1.jpg',
//       publishedAt: '2022-07-23T11:45:06Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'Ltn.com.tw',
//       },
//       author: '自由時報',
//       title: '中職》德保拉挑戰連3場完封失敗 桃猿單局灌8分 - 自由時報',
//       description:
//         '中信兄弟德保拉今天挑戰連續3場完封的中職紀錄，對樂天桃猿投到6局上不但破功還提前退場，最後連勝投都飛掉，樂天這局鯨吞8分以8：5超前。德保拉前2次出賽都投出完封，今天挑戰曹竣崵創於1999年的連續3場完封紀錄，前5局雖力保不失分，6局上開局連挨2安，1出局後被 成晉安打破功，再被廖健富、郭嚴文連續安',
//       url: 'https://sports.ltn.com.tw/news/breakingnews/4001950',
//       urlToImage:
//         'https://img.ltn.com.tw/Upload/sports/page/800S/2022/07/23/phpNqzWcK.jpg',
//       publishedAt: '2022-07-23T11:39:00Z',
//       content: '© 2022 The Liberty Times. All Rights Reserved.',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Gamereactor.cn',
//       },
//       author: null,
//       title: 'PowerWash Simulator - 遊戲玩法 - Gamereactor China',
//       description:
//         '如您所知，我們喜歡嘗試那些奇怪的模擬器，這些模擬器已經入侵視頻遊戲世界幾年了。這一次，我們正在清潔一切，從汽車和自行車到遊樂場和整個花園。你可能會認為這很愚蠢，或者它一定很無聊，但事實是，我們對每個關卡都著迷，即使在停止錄製后，我們也覺得有必要完成這個關卡，這很有趣，就像上癮一樣有趣！',
//       url: 'https://www.gamereactor.cn/grtv/612323/PowerWash+Simulator+%E9%81%8A%E6%88%B2%E7%8E%A9%E6%B3%95/',
//       urlToImage: 'https://www.gamereactor.cn/media/grtv/23/612323_w926.jpg',
//       publishedAt: '2022-07-23T11:08:27Z',
//       content: 'CookieGamereactor cookies cookies\r\nOK',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Yahoo Entertainment',
//       },
//       author: '劉哲琪',
//       title: 'BA.5太恐怖 日本一天確診數破20萬、官房長官也中鏢 - Yahoo奇摩新聞',
//       description:
//         '隨著BA.5逐漸成為主流株，日本迎來第7波疫情，單日確診數屢破新高，今（23）日首度突破20萬人大關。東京都確診數連續3日超過3萬人。日本內閣官房長官松野博一也於昨（22）日出現發燒、咳嗽等症狀，PCR篩檢後確診新冠肺炎。',
//       url: 'https://tw.news.yahoo.com/ba-5%E5%A4%AA%E6%81%90%E6%80%96-%E6%97%A5%E6%9C%AC-%E5%A4%A9%E7%A2%BA%E8%A8%BA%E6%95%B8%E7%A0%B420%E8%90%AC-%E5%AE%98%E6%88%BF%E9%95%B7%E5%AE%98%E4%B9%9F%E4%B8%AD%E9%8F%A2-103128371.html',
//       urlToImage:
//         'https://s.yimg.com/uu/api/res/1.2/ic9Nhom8vA3fZBRSRxPaXg--~B/aD01OTY7dz0xMDYwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/zh-tw/news_tvbs_com_tw_938/8b882ffd59e2ea10badcbb5d1869e270',
//       publishedAt: '2022-07-23T10:31:28Z',
//       content:
//         'BA.5723203322PCR\r\nJNN23209744326983322501\r\n7OmicronOmicronBA.5BA.5BA.2BA.5\r\n22PCR\r\n TVBS BA57BA.5 840BA.5 BA.511 \r\n 375% 59 9',
//     },
//     {
//       source: {
//         id: null,
//         name: 'udn 聯合新聞網',
//       },
//       author: '記者林政忠／即時報導',
//       title: '新竹球場糟如古巴？高虹安：營造商曾造成5死工安意外 - udn.com',
//       description:
//         '斥資12億元重新整建的新竹球場昨正式啟用，但被球員批評「場地糟如古巴」。民眾黨新竹市長參選人高虹安今天質疑，一個花費12...',
//       url: 'https://udn.com/news/story/7001/6483047',
//       urlToImage:
//         'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2022/07/23/realtime/18122190.jpg&s=Y&x=0&y=0&sw=1280&sh=853&exp=3600',
//       publishedAt: '2022-07-23T09:34:04Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'Setn.com',
//       },
//       author: '三立新聞網',
//       title: '林志穎才剛自撞！賴慧如驚傳「死亡車禍」 傷勢狀況曝光 - 三立新聞',
//       description:
//         '入圍第33屆的金曲台語女歌后的賴慧如，今（23日）帶著外婆與女兒一起出席寶吉祥「浮雕肖像計畫」展覽開展記者會，現場雕刻師還親自幫三代同堂的三人雕刻，微妙微俏的作品，也感動了賴慧如，即將在下個月2日歡慶26歲生日的她，主辦單位也提前慶生，推出蛋糕，讓她忍不住感動落淚，講到生日願望，她除了希望家人身體健康，還有事業越來越穩定，不過屬鼠的她，聽說最近會有劫數，沒想到昨天就差點遇到「死亡車禍」，隔了一天仍',
//       url: 'https://star.setn.com/news/1150271',
//       urlToImage:
//         'https://attach.setn.com/newsimages/2022/07/23/3747012-PH.jpg',
//       publishedAt: '2022-07-23T09:32:54Z',
//       content: null,
//     },
//     {
//       source: {
//         id: null,
//         name: 'Yahoo Entertainment',
//       },
//       author: '娛樂中心／綜合報導',
//       title: '壯壯穿丁字泳褲！招牌部位果香四溢 - Yahoo奇摩新聞',
//       description:
//         '壯壯（本名沈立心）從節目《國光幫幫忙》助理主持入行，2017年帶啦啦隊到韓國，為征戰世界棒球經典賽的中華隊應援，被封「台灣隊長」，目前為樂天桃猿、台新夢想家啦啦隊團長，她今（23日）在粉專發文宣傳首本...',
//       url: 'https://tw.news.yahoo.com/%E5%A3%AF%E5%A3%AF%E7%A9%BF%E4%B8%81%E5%AD%97%E6%B3%B3%E8%A4%B2-%E6%8B%9B%E7%89%8C%E9%83%A8%E4%BD%8D%E6%9E%9C%E9%A6%99%E5%9B%9B%E6%BA%A2-090000811.html',
//       urlToImage:
//         'https://s.yimg.com/uu/api/res/1.2/mhuHqeoDyKTiS3uKjhlX8A--~B/aD00NTA7dz04MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/nownews.com/1d30b606a1025c875f92aa7de2089a01',
//       publishedAt: '2022-07-23T09:00:00Z',
//       content: '20 160 CD202272584CARTURE',
//     },
//     {
//       source: {
//         id: null,
//         name: 'Soundofhope.org',
//       },
//       author: null,
//       title: '警惕：每天小酌一杯或致老年痴呆 - SOH_NEWS_CN',
//       description:
//         '這項迄今規模最大的研究表明，飲酒會抑制一種控制人體對礦物質吸收的激素，從而加劇認知衰退。',
//       url: 'https://www.soundofhope.org/post/639563?lang=b5',
//       urlToImage:
//         'https://img.soundofhope.org/2022-07/wine-619452_1280-1658529103172.jpg',
//       publishedAt: '2022-07-23T08:53:52Z',
//       content:
//         '202272334\r\n305070\r\n(Acta Neuropathologica Communications)\r\n (4) \r\n pixabay\r\nARDARDARD ARDARD\r\n2.1·\r\n pixabay\r\n·2.14069(MRI)7000MRI\r\n7\r\n()',
//     },
//   ],
// };

export default function News() {
  const [param, setParam] = useState('/');
  const [rawData, setData] = useState(null);
  const [title, setTitle] = useState('熱門報導')

  const { pathname } = useLocation();

  const getParam = (path) => {
    switch (path) {
      case '/':
        return {
          country: 'tw',
        };
      case '/tw':
        return {
          country: 'tw',
        };
      case '/cn':
        return {
          country: 'cn',
        };
      case '/global':
        return {
          country: 'tw',
        };
      case '/entertainment':
        return {
          category: 'entertainment',
        };
      case '/business':
        return {
          category: 'business',
        };
      case '/sports':
        return {
          category: 'sports',
        };
      case '/technology':
        return {
          category: 'technology',
        };
    }
  };

  useEffect(() => {
    let newsParams = new URLSearchParams(getParam(pathname)).toString();
    setParam(newsParams);
    getTitle()
  }, [pathname]);

  const fetchData = async (param) => {
    try {
      const response = await fetchNews(param);
      const { data } = response;
      setData(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getTitle = () => {
    const element = sideMenuConfig.find(menu => menu.path === pathname)
    if (element) {
      setTitle(element.name)
    }
  }

  useEffect(() => {
    fetchData(param);
  }, [param]);

  return (
    <div className="news-wrapper">
      <div className="news-wrapper__header">
        <h2 className="news-wrapper__header__title">{title}</h2>
        <p className="news-wrapper__header__description">
          由 MicroSoft News 支援
        </p>
      </div>
      <div className="news-wrapper__card-wrapper">
        {/* {dummyData.articles.map((article) => ( */}
        {rawData &&
          rawData.articles.map((article) => (
            <NewsCard
              key={article.title}
              title={article.title}
              image={article.urlToImage}
              fromNow={moment(article.publishedAt).fromNow()}
              sourceName={article.source.name}
            />
          ))}
      </div>
    </div>
  );
}
