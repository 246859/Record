const DIR = "./plugins/Record";
const CONFIG_FILE = './plugins/Record/config.json';
const DATA_FILE = './plugins/Record/config.json';

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
        DATA_PATH:'/config.json'
    },
    LAND:{//领地系统插件
        DIR:'/iland',
        DATA_PATH:'/relationship.json'
    }
}

const config = {
    'land':false,//领地的数据
    "achievement":false,//成就系统插件的数据
    "rank":{//ranking插件的数据
        "enable":false,
        "PlayerDie":true,
        "Place":true,
        "Destroy":true,
        "MobDie":true,
    },
    "essential":{//基础插件的数据
        "type":0,//0为TMET 1为LXLESS
        "home":false,
        "money":false,
    }
};

const data = {};


/**
 * @description:文件IO操作
 */
function init(){//初始化文件夹
    if (!file.exists(DIR))
        file.mkdir(DIR);
    if (!file.exists(CONFIG_FILE))
        file.writeTo(CONFIG_FILE,JSON.stringify(config));
    if (!file.exists(DATA_FILE))
        file.writeTo(DATA_FILE,JSON.stringify(data));
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