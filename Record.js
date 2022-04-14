/**
 * @description初始化时常量
 */
const DIR = "./plugins/Record";//目录
const CONFIG_FILE = './plugins/Record/config.json';//配置文件
const DATA_FILE = './plugins/Record/config.json';//数据文件

const PATH={
    BDS_PLUGINS_PATH:'./plugins',//BDS插件目录
    RANKING:{//排行榜数据文件目录
        DIR:'/ranking/data',
        DESTROY:'/Destroy.json',//方块破坏
        MOB_DIE:'/MobDie.json',//击杀实体
        PLACE:'/Place.json',//方块放置
        PLAYER_DIE:'/PlayerDie.json'//玩家死亡
    },
    ESSENTIAL_TIMI:{//TMET基础插件
        DIR:'/Timiya/data',
        MONEY_PATH:'/offlineMoney.json',//离线经济数据文件
        HOME_PATH:'/homelist.json'//家园数据文件
    },
    ESSENTIAL_LXLESS:{//LXLESS基础插件
        DIR:'/LXLEssential',
        MONEY_PATH:'/offlineMoney.json',//离线经济数据文件
        HOME_PATH:'/data.json'//家园数据文件
    },
    ACHIEVEMENT:{//成就系统
        DIR:'/Achievement',
        DATA_PATH:'/count.json'//成就统计文件
    },
    LAND:{//领地系统插件
        DIR:'/iland',
        DATA_PATH:'/relationship.json'//关系数据文件
    }
}

const CONFIG = {
    'land':{//领地的数据
        "enable": false
    },
    "achievement":{//成就系统插件的数据
        "enable":false
    },
    "rank":{//ranking插件的数据
        "enable":false,
        "PlayerDie":true,
        "Place":true,
        "Destroy":true,
        "MobDie":true,
    },
    "essential":{//基础插件的数据
        "enable":false,
        "type":0,//0为TMET 1为LXLESS
        "home":false,
        "money":false,
    }
};

const DATA = {};


/**
 * @description运行时常量
 */

const PL_KEYS={
    RANK:"rank",
    LAND:"land",
    ACHI:"achievement",
    ESSE:"essential"
}
let RT_CONFIG = {};

/**
 * @description:文件IO操作
 */
function init(){//初始化文件夹
    if (!file.exists(DIR))
        file.mkdir(DIR);
    if (!file.exists(CONFIG_FILE))
        file.writeTo(CONFIG_FILE,JSON.stringify(CONFIG));
    if (!file.exists(DATA_FILE))
        file.writeTo(DATA_FILE,JSON.stringify(DATA));
}

function initData(){//初始化数据
    let config = readJsonFromFile(CONFIG_FILE);
    if (!config)return;
    RT_CONFIG = config;
}

function writeJsonToFile(path,data){//将json对象写入文件
    file.writeTo(path,JSON.stringify(data));
}

function readJsonFromFile(path){//从文件中读取json对象
   let buffer = file.readFrom(path);
   return buffer?JSON.parse(buffer):null;
}

/**
 * @description:数据操作
 */


function initPlData(pl){//在玩家进入服务器时初始化数据
    let plData = readJsonFromFile(DATA_FILE);
    if (!plData || !pl)return;
    if (!plData[pl.xuid])
        plData[pl.xuid] = {
        name:pl.name,
        rank:{},
        achievement: {},
        land:{},
        essential:{}
    };
    writeJsonToFile(DATA_FILE,plData);
}

function loadRankData(){//获取Ranking插件的数据
    let plData = readJsonFromFile(DATA_FILE);
    if (!CONFIG.rank.enable && !plData)return;

    let rankFlag = " ◆ §l";//去除冗余符号
    let rankPath = PATH.RANKING;//获取rank插件path对象
    let dirPath = PATH.BDS_PLUGINS_PATH+rankPath.DIR;//插件文件夹地址

    let keys = Object.keys(rankPath);
    let DataKeys = Object.keys(plData);

    for (let i = 1; i < keys.length; i++) {
        let rankKey = keys[i];//rank类型
        let filePath = dirPath + rankPath[rankKey];//对应的文件地址
        let rankData = readJsonFromFile(filePath);//读取对应文件json数据
        if (!rankData) continue;
        Object.keys(rankData).forEach(rankName=>{//加载json中的玩家数据
            let rankPlData = rankData[rankName];//玩家数据
            let xuid = data.name2xuid(rankNameFormat(rankName));//rank中存储的是name，需要手动转换成xuid
            let pl = plData[xuid];//玩家记录数据中的一个玩家对象
            if (!pl || !pl[PL_KEYS.RANK]) return;
            pl[PL_KEYS.RANK][rankKey] = rankPlData;
        })

    }

    writeJsonToFile(DATA_FILE,plData);
    function rankNameFormat(rankName){//rank字符串格式化
        return rankName.includes(rankFlag)?rankName.split(rankFlag)[1]:rankName;
    }
}

//TODO 加载成就数据文件
function loadAchievementData(){

}

//TODO 加载基础插件数据
function loadEssentialData(){}

//TODO 加载领地插件数据
function loadLandData(){

}
