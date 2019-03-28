/**
 * 问题分类、来源（TypeId、FromId的相互映射），来源于sessionStorage
 */
class QuestionClassificationMap {
    static _fromMapId = {};
    static _fromMapName = {};
    static _typeMapId = {};
    static _typeMapName = {};

    //初始化数据
    static _initData() {
        if (Object.keys(QuestionClassificationMap._fromMapId).length <= 0) {
            let typeData = JSON.parse(sessionStorage.getItem('bigClass'));
            let fromData = JSON.parse(sessionStorage.getItem('smallClass'));
            let fromMapId = {};
            let fromMapName = {};
            let typeMapId = {};
            let typeMapName = {};
            if (typeData.length > 0 && fromData.length > 0) {
                //构建索引
                for (let i = 0; i < typeData.length; i++) {
                    typeMapId[typeData[i].id] = typeData[i].name;
                    typeMapName[typeData[i].name] = typeData[i].id;
                }
                for (let i = 0; i < fromData.length; i++) {
                    fromMapId[fromData[i].id] = fromData[i].name;
                    fromMapName[fromData[i].name] = fromData[i].id;
                }
                QuestionClassificationMap._fromMapId = fromMapId;
                QuestionClassificationMap._fromMapName = fromMapName;
                QuestionClassificationMap._typeMapId = typeMapId;
                QuestionClassificationMap._typeMapName = typeMapName;
            }
        }

    }

    /**
     * 类型名转类型ID
     * @param typeName
     * @constructor
     */
    static typeName2TypeId(typeName) {
        QuestionClassificationMap._initData();
        return QuestionClassificationMap._typeMapName[typeName];
    }

    /**
     * 小类型名转小类型ID
     * @param fromName
     * @constructor
     */
    static fromName2FromId(fromName) {
        QuestionClassificationMap._initData();
        return QuestionClassificationMap._fromMapName[fromName];
    }

    /**
     * 类型ID转类型名
     * @param typeId
     * @constructor
     */
    static typeId2TypeName(typeId) {
        QuestionClassificationMap._initData();
        return QuestionClassificationMap._typeMapId[typeId];
    }

    /**
     * 小类型ID转小类型名
     * @param fromId
     * @constructor
     */
    static fromId2FromName(fromId) {
        QuestionClassificationMap._initData();
        return QuestionClassificationMap._fromMapId[fromId];
    }
}

export default QuestionClassificationMap;