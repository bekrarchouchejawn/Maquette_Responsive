var slide = {

  nbSlide : 0,
  nbCurrent : 1,
  elemCurent : null,
  elem : null,
  timer : null,

  init : function(elem){
    this.nbSlide = elem.find(".slide").length;

    elem.append('<div id="next"></div>');
    elem.append('<div id="prev"></div>');

    //elem.append('<div class="miniature"></div>')
    elem.append('<div class="nav"></div>');
   // elem.append('<select id="choix" name="choix"> </select>');
    elem.find("#choix").append("<option value='1'>Slide left / right</option><option value='2'>Fade</option><option value='4'>Slide up</option><option value='3'>No effect</option>");
   
    for(var i=1; i <= this.nbSlide; i++){
      var valdiv = $("#slide"+i+" .contenue").html();
      elem.find(".nav").append("<span id='"+i+"'> </span>");
      elem.find(".miniature").append(valdiv);
    }

    elem.find(".nav span").click(function(){ slide.goSlide(this.id); })

    elem.find(".miniature img").click(function(){ slide.goSlide(this.id); })

    elem.find("#next").click(function(){ slide.next(); })
    elem.find("#prev").click(function(){ slide.prev(); })

    this.elem=elem;
    elem.find(".slide").hide();
    elem.find(".slide:first").show();
    this.elemCurent = elem.find(".slide:first");
    this.elem.find(".nav span:first").addClass("active");

    slide.play();

    elem.mouseover(slide.stop);
    elem.mouseout(slide.play);

  },

  goSlide : function(num){

    var choix = 1;

    if(num == this.nbCurrent)
    {
      return false;
    }

    if(choix == 1)
    {
      var sens = 1;

      if(num < this.nbCurrent){
        sens = -1;
      }
      var cssDeb = {"left" : sens*this.elem.width() };
      var cssFin = {"left" : -sens*this.elem.width() };
      this.elem.find("#slide"+num).show().css(cssDeb);

      this.elem.find("#slide"+num).animate({"top":0,"left":0},500);
      this.elemCurent.animate(cssFin,500)
    }
    else if(choix == 2 )
    {
      var cssDeb = {"left" : 0 };
      var cssFin = {"left" : 0 };
      this.elem.find("#slide"+num).css(cssDeb)

      this.elemCurent.fadeOut();
      this.elem.find("#slide"+num).fadeIn();
    } 
    else if(choix == 3)
    {
      var cssDeb = {"left" : 0 };
      var cssFin = {"left" : 0 };
      this.elem.find("#slide"+num).css(cssDeb)

      this.elemCurent.hide();
      this.elem.find("#slide"+num).show();
    }
    else if(choix == 4)
    {
      var cssDeb = {"left" : 0  };
      var cssFin = {"left" : 0  };
      this.elem.find("#slide"+num).css(cssDeb)

      this.elemCurent.slideUp();
      this.elem.find("#slide"+num).slideDown();
    }  

    this.elem.find(".miniature img").removeClass("active");
    this.elem.find(".miniature img:eq("+(num-1)+")").addClass("active");

    this.elem.find(".nav span").removeClass("active");
    this.elem.find(".nav span:eq("+(num-1)+")").addClass("active");

    this.nbCurrent = num;
    this.elemCurent = this.elem.find("#slide"+num);
  },

    next : function(){
      var num = this.nbCurrent; num++;
      if(num > this.nbSlide){
        num = 1;
      }
      this.goSlide(num);
    },

  prev : function(){
    var num = this.nbCurrent; num--;
    if(num < 1){
      num = this.nbSlide;
    }
    this.goSlide(num);
  },

  stop : function(){
    window.clearInterval(slide.timer);
  },

  play : function(){
    window.clearInterval(slide.timer);
    slide.timer = window.setInterval("slide.next()",5000);
  },

}

$(function(){
  slide.init($("#slider"));
});
