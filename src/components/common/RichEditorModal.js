import E from "wangeditor";
import {Modal} from "antd";

/**
 * 富文本编辑框工具（用于Modal），继承于Modal
 * created by yugao 2018-11-10
 **/
//重写Model 回调
class RichEditorModal extends Modal {
    //新增的回调或者参数，必须
    static defaultProps = Object.assign(Modal.defaultProps, {
        //内容回调
        onChange(html) {
        },
        //文本输入框容器，输入div id或者element，如：document.getElementById('reditor') 或者 reditor
        editorId: 'editor',
        //输入框内容
        content: '',
        menus: [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ],
        emotions: [{
            // tab 的标题
            title: '默认',
            // type -> 'emoji' / 'image'
            type: 'image',
            // content -> 数组
            content: [
                {
                    alt: '[坏笑]',
                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
                },
                {
                    alt: '[舔屏]',
                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
                },
                {
                    alt: '[what?]',
                    src: 'http://pic2.sc.chinaz.com/Files/pic/Listfaces/5223/01.gif'
                },
                {
                    alt: '[在吗]',
                    src: 'http://pic2.sc.chinaz.com/Files/pic/Listfaces/5223/00.gif'
                },
                {
                    alt: '[加油鸭]',
                    src: 'http://pic.sc.chinaz.com/Files/pic/Listfaces/5239/03.gif'
                },
                {
                    alt: '[我母鸡啊]',
                    src: 'http://pic.sc.chinaz.com/Files/pic/Listfaces/4377/59.gif'
                }
            ]
        },
            {
                title: 'emoji',
                type: 'emoji',
                content: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '😊', '😇', '🙂', '🙃', '😉', '😓', '😪', '😴', '🙄', '🤔', '😬', '🤐']
            }
        ]
    });
    editor = null;

    createEditor(element) {
        if (element != null && this.editor == null) {
            let editor = new E(element);
            // 自定义菜单配置
            editor.customConfig.menus = this.props.menus;
            editor.customConfig.emotions = this.props.emotions;
            editor.customConfig.onchange = html => {
                this.props.onChange(html);
            };
            // 配置服务器端地址
            editor.customConfig.uploadImgServer = 'http://kstore.ksust.com/upload/e93f5b15349ac18538a82dc9a686b4b5';
            editor.customConfig.uploadFileName = 'file';
            editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    let url = result.data.url;
                    insertImg(url)
                }
            };
            editor.create();
            editor.txt.html(this.props.content);
            this.editor = editor;
        }
    }

    // 回调时机
    componentDidUpdate(prevProps, prevState) {
        setTimeout(() => {
            if (this.props.content !== prevProps.content && this.editor != null) {
                //初始内容发生变化，更新编辑器内容
                this.editor.txt.html(this.props.content);
            }
            let element = document.getElementById(this.props.editorId);
            this.createEditor(element);
        }, 0);
    }

}

export default RichEditorModal;