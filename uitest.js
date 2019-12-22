"ui";
ui.layout(

    <vertical padding="32">
<button text="无边框有颜色按钮" style="Widget.AppCompat.Button.Borderless.Colored" w="auto"/>
        <button text="开始" style="Widget.AppCompat.Button.Colored" w="auto"/>
        <checkbox id="cb1" text="复选框"/>
        <checkbox id="cb2" text="勾选的复选框"/>
        <radiogroup>
            <radio text="单选框1"/>
            <radio text="单选框2"/>
            <radio text="单选框3"/>
        </radiogroup>
        <radiogroup mariginTop="28">
            <radio text="单选框1"/>
            <radio text="单选框2"/>
            <radio text="勾选的单选框3" checked="true"/>
        </radiogroup>
    </vertical>
);

ui.cb1.on("check", (checked)=>{
    if(checked){
        toast("第一个框被勾选了");
    }else{
        toast("第一个框被取消勾选了");
    }
});