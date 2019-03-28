import keyMirror from 'key-mirror';

export default keyMirror({
    //首页三个数据
    GET_HOME_DATA_SUCCESS: null,
    GET_HOME_DATA_FAILURE: null,
    // 根据问题获取答案
    GET_QUESTION_ANSWER_SUCCESS: null,
    GET_QUESTION_ANSWER_FAILURE: null,
    // 获取验证码
    GET_CAPTCHA_SUCCESS: null,
    GET_CAPTCHA_FAILURE: null,
    // 登录
    PUT_LOGIN_SUCCESS: null,
    PUT_LOGIN_FAILURE: null,
    //第三方登录
    PUT_OTHERLOGIN_SUCCESS: null,
    PUT_OTHERLOGIN_FAILURE: null,
    // 获取常见问题
    GET_COMMON_QUESTION_SUCCESS: null,
    GET_COMMON_QUESTION_FAILURE: null,
    // 对问题就行评价
    PUT_QUESTION_APPRAISE_SUCCESS: null,
    PUT_QUESTION_APPRAISE_FAILURE: null,
    //获取用户列表信息
    GET_USERLIST_SUCCESS: null,
    GET_USERLIST_FAILURE: null,
    //添加用户
    ADD_USER_SUCCESS: null,
    ADD_USER_FAILURE: null,
    //修改用户信息
    UPDATE_USERINFO_SUCCESS: null,
    UPDATE_USERINFO_FAILURE: null,
    //获取已解决问题列表
    GET_SOLVEQUESTION_SUCCESS: null,
    GET_SOLVEQUESTION_FAILURE: null,
    //获取未解决问题列表
    GET_NOTSOLVEQUESTION_SUCCESS: null,
    GET_NOTSOLVEQUESTION_FAILURE: null,
    //保存管理员修改的问题信息
    PUT_ANSWER_SUCCESS: null,
    PUT_ANSWER_FAILURE: null,
    //获取知识库列表
    GET_REPOSITORYLIST_SUCCESS: null,
    GET_REPOSITORYLIST_FAILURE: null,
    //查找答案
    GET_FINDKNOWLEDGE_SUCCESS: null,
    GET_FINDKNOWLEDGE_FAILURE: null,
    // 管理员修改问题
    UPDATE_QUESTION_SUCCESS: null,
    UPDATE_QUESTION_FAILURE: null,
    // 获取用户基本信息
    GET_USER_INFO_SUCCESS: null,
    GET_USER_INFO_FAILURE: null,
    // 更新用户基本信息
    UPDATE_USER_INFO_SUCCESS: null,
    UPDATE_USER_INFO_FAILURE: null,

    //获取用户已解决问题
    GET_USERSOLVEQUESTION_SUCCESS: null,
    GET_USERSOLVEQUESTION_FAILURE: null,
    //获取用户未解决问题
    GET_USERSOLVENOTQUESTION_SUCCESS: null,
    GET_USERSOLVENOTQUESTION_FAILURE: null,
    //获取用户提交问题的状态
    PUT_SAVEQUESTION_SUCCESS: null,
    PUT_SAVEQUESTION_FAILURE: null,
    //用户修改已解决问题
    UPDATE_SOLVENOTQUESTION_SUCCESS: null,
    UPDATE_SOLVENOTQUESTION_FAILURE: null,
    //获取反馈管理中小分类数据
    GET_SMALL_CLASS_DATA_SUCCESS: null,
    GET_SMALL_CLASS_DATA_FAILURE: null,
    //获取反馈管理中大分类数据
    GET_BIG_CLASS_DATA_SUCCESS: null,
    GET_BIG_CLASS_DATA_FAILURE: null,
    // 用户回答反馈问题
    PUT_QUESTION_ANSWER_SUCCESS: null,
    PUT_QUESTION_ANSWER_FAILURE: null,

    //获取答案列表
    GET_QUESTIONLIST_SUCCESS: null,
    GET_QUESTIONLIST_FAILURE: null,

    //添加知识
    ADD_KNOWLEDGE_SUCCESS: null,
    ADD_KNOWLEDGE_FAILURE: null,
    // 获取大分类
    GET_BIG_CKASS_SUCCESS: null,
    GET_BIG_CKASS_FAILURE: null,
    // 获取小分类
    GET_SMALL_CKASS_SUCCESS: null,
    GET_SMALL_CKASS_FAILURE: null,
    // 用户修改密码
    UPDATE_USER_PASSWORD_SUCCESS: null,
    UPDATE_USER_PASSWORD_FAILURE: null,
    // 提问数据概览
    GET_ANSWER_DATA_SUCCESS: null,
    GET_ANSWER_DATA_FAILURE: null,
    // 推送知识到数据库
    PUT_KNOWLEDGE_SUCCESS: null,
    PUT_KNOWLEDGE_FAILURE: null,
    // 上传导入数据库
    UPLOAD_REPOSITORY_SUCCESS: null,
    UPLOAD_REPOSITORY_FAILURE: null,
})