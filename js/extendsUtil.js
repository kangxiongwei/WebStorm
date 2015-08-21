/**
 * 一个用来做JS继承的工具
 * Created by kangxiongwei on 2015/8/21.
 */

//加命名空间，单例
ExtendsUtils = {
    extend: function(subClass,superClass){
        var F = function(){};
        F.prototype = superClass.prototype;
        //实现了原型的继承，方法被继承
        subClass.prototype = new F();
        //属性继承
        //子类多了一个属性superClass
        subClass.superClass = superClass.prototype;
    }
};

/*
function extend(subClass,superClass){
    var F = function(){};
    F.prototype = superClass.prototype;
    //实现了原型的继承，方法被继承
    subClass.prototype = new F();
    //属性继承
    //子类多了一个属性superClass
    subClass.superClass = superClass.prototype;
}
*/




