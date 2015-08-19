/**
 * CMS的核心部分插件
 * @author kangxiongwei
 * @date 2015/7/29
 */
(function($){
    /**
     * 手风琴插件
     * selectedClazz：默认打开的ul
     * titleTagName：每个模块的头部标签
     * @param opts
     */
    $.fn.myaccordion = function(opts) {
        var settings = $.extend({
            selectedClazz: "navSelected",
            titleTagName: "h3"
        },opts||{});
        //所有标题节点
        var titleNode = $(this).find("ul>"+settings.titleTagName);
        //被选中的ul下的标题节点
        var selectedNode = $(this).find("ul."+settings.selectedClazz+">"+settings.titleTagName);
        //默认的样式，让鼠标放上去变形
        titleNode.css("cursor","pointer");
        //初始化，让选中的标题节点的内容显示，其余的隐藏
        titleNode.nextAll().css("display","none");
        selectedNode.nextAll().css("display","block");
        //判断是否被点击，点击后，根据当前的拉开和关闭转态，进行相反操作
        titleNode.click(function(){
            var checked = $(this).parent().hasClass(settings.selectedClazz);
            if (checked) {
                //说明当前的元素是拉开状态，进行关闭操作
                $(this).parent().removeClass(settings.selectedClazz);
                $(this).nextAll().slideUp("fast");
            } else {
                $(this).parent().addClass(settings.selectedClazz);
                $(this).nextAll().slideDown("fast");
            }
        });
    }
})(jQuery);
