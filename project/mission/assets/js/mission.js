/**
 * Created by XIN-ice on 15/9/1.
 */

$(".mission-descrpit").click(function(){
    var checkerVal = $(this).attr("checker");
    console.log(checkerVal);
    if(checkerVal == "false"){
        $(this).parent().parent().parent().next().fadeIn();
        $(this).attr("checker","true");
    }else{
        $(this).parent().parent().parent().next().fadeOut();
        $(this).attr("checker","false");
    }
});


$(".gotop").click(function(){
    var arrtype = $(this).attr("fol");
    if(arrtype == "up"){
        $(this).parent().next().fadeOut();
        $(this).attr('fol','down');
        $(this).css("transform","rotate(180deg)");
    }else{
        $(this).parent().next().fadeIn();
        $(this).attr('fol','up');
        $(this).css("transform","rotate(0deg)");
    }
});

$('#myModal').on('shown.bs.modal', function () {
    setTimeout(function(){
        $('#myModal').modal('hide');
    },5000000);
});

$('#myModal').on('hidden.bs.modal', function () {
    $("#super-mario").hide();
    $("#flag-tata").show();
    $("#rokie").fadeOut("slow");
});
function rokie(){
    swal({
        title: "",
        text: '只有完成新手任务，才可以开启后续任务。',
        confirmButtonText: "好的吧" });
}
function daily(){
    swal({
        title: "",
        text: '每项任务当日只能完成一次,当日未领取的奖励第二天会消失。',
        type: "warning",
        confirmButtonText: "好的吧" });
}

function monthly(){
    swal({
        title: "",
        text: '每项任务当月只能完成一次,当月未领取的奖励下个月会消失。',
        type: "info",
        confirmButtonText: "好的吧" });
}
