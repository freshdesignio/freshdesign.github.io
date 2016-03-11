$(document).ready(function(){
  $("body, .menuIsh").css({height:$(window).innerHeight()})
  $(window).resize(function(){
    $("body, .menuIsh").css({height:$(window).innerHeight()})
  });


(function(){
  console.log('instafunction');
  //$('.top').velocity({ translateX:'-100%'},{duration:0, delay:0,queue:false})
  //$('.bottom').velocity({ translateX:'100%'},{duration:0, delay:0,queue:false})
$('.right .types, .right .components').velocity({translateX:'100%'}, {duration:0, delay:0, queue:0})
})();



//{{{{ FILTERS MENU START }}}}



$(".item").on('mouseenter', function(){
  $(this).children('button').velocity("transition.flipYIn",{duration:500, delay:0})
})
$(".item").on('mouseleave', function(){
  $(this).children('button').velocity("transition.flipYOut",{duration:500, delay:0})
})



mobileMenuCounter = 1;
$('.lineHold').on('click', function(){
  console.log('mobile Menu was clicked')
	mobileMenuCounter++;
		if(mobileMenuCounter%2=== 0){
			mobileOpen();
		 }else if(mobileMenuCounter%2===1){
			mobileClose();
		}
})

function mobileOpen(){
  $('.mobileMenuContainer').velocity("transition.fadeIn", {duration:500, delay:0})
  $('.line2').velocity({width:'0px'},{duration:300, delay:0})
  $('.line1').velocity({rotateZ:'45deg', translateY:'4',translateX:'4px'},{duration:300, delay:0})
  $('.line3').velocity({rotateZ:'-45deg', translateY:'-4',translateX:'4px'},{duration:300, delay:0})
}
function mobileClose(){
  $('.mobileMenuContainer').velocity("transition.fadeOut", {duration:500, delay:0})
  $('.line2').velocity({width:'70%'},{duration:300, delay:0})
  $('.line1').velocity({rotateZ:'0', translateY:'0',translateX:'0'},{duration:300, delay:0})
  $('.line3').velocity({rotateZ:'0', translateY:'0',translateX:'0'},{duration:300, delay:0})
}


menuCounter = 1;
$('.filters').on("click", function(){
  console.log('filetrs clicked')
	menuCounter++;
		if(menuCounter%2=== 0){
			open();
		 }else if(menuCounter%2===1){
			close();
		}
})


$('#Container, .left').on('click', function(){
  close();
  $('#Container .item').removeClass('noPoint')
  menuCounter = 1;
})

function open(){
  $('.types').velocity({translateX:'0'}, {duration:500, delay:0, easing: "easeInOutQuart"})
  $('.components').velocity({translateX:'0'}, {duration:450, delay:50, easing: "easeInOutQuart"})

  $('#Container .item').addClass('noPoint')
  console.log("registered");

}

function close(){
  $('.types').velocity({translateX:'100%'}, {duration:500, delay:0, easing: "easeInOutQuart"})
  $('.components').velocity({translateX:'100%'}, {duration:450, delay:50, easing: "easeInOutQuart"})
}


sortBtnCounter = 1;
$('.sortBtn').on('click', function(){
  console.log('mobile Menu was clicked')
	sortBtnCounter++;
		if(sortBtnCounter%2=== 0){
			sortOpen();
		 }else if(sortBtnCounter%2===1){
			sortClose();
		}
})

function sortOpen(){
  $('.sortOptions').velocity("transition.slideDownBigIn", {duration:500, delay:0})
  $('.sortTriangle').velocity({rotateZ:'180deg'}, {duration:500, delay:0})

}
function sortClose(){
  $('.sortOptions').velocity("transition.slideRightBigOut", {duration:500, delay:0})
  $('.sortTriangle').velocity({rotateZ:'0'}, {duration:500, delay:0})

}

























  //{{{THIS IS THE MIXITUP CODE}}}
  // To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "multiFilter".

  var multiFilter = {

    // Declare any variables we will need as properties of the object

    $filterGroups: null,
    $filterUi: null,
    $reset: null,
    groups: [],
    outputArray: [],
    outputString: '',

    // The "init" method will run on document ready and cache any jQuery objects we will need.

    init: function(){
      // As a best practice, in each method we will asign "this"
      // to the variable "self" so that it remains scope-agnostic.
      // We will use it to refer to the parent "checkboxFilter" object
      // so that we can share methods and properties between all parts
      // of the object.
      var self = this;

      self.$filterUi = $('#Filters');
      self.$filterGroups = $('.filter-group');
      self.$reset = $('#Reset');
      self.$container = $('#Container');

      self.$filterGroups.each(function(){
        self.groups.push({
          $inputs: $(this).find('input'),
          active: [],
  		    tracker: false
        });
      });

      self.bindHandlers();
    },

    // The "bindHandlers" method will listen for whenever a form value changes.

    bindHandlers: function(){
      var self = this,
          typingDelay = 300,
          typingTimeout = -1,
          resetTimer = function() {
            clearTimeout(typingTimeout);

            typingTimeout = setTimeout(function() {
              self.parseFilters();
            }, typingDelay);
          };

      self.$filterGroups
        .filter('.checkboxes')
      	.on('change', function() {
        	self.parseFilters();
      	});

      self.$filterGroups
        .filter('.search')
        .on('keyup change', resetTimer);

      self.$reset.on('click', function(e){
        e.preventDefault();
        self.$filterUi[0].reset();
        self.$filterUi.find('input[type="text"]').val('');
        self.parseFilters();
      });
    },

    // The parseFilters method checks which filters are active in each group:

    parseFilters: function(){
      var self = this;

      // loop through each filter group and add active filters to arrays

      for(var i = 0, group; group = self.groups[i]; i++){
        group.active = []; // reset arrays
        group.$inputs.each(function(){
          var searchTerm = '',
         			$input = $(this),
              minimumLength = 2;

          if ($input.is(':checked')) {
            group.active.push(this.value);
          }

          if ($input.is('[type="text"]') && this.value.length >= minimumLength) {
            searchTerm = this.value
              .trim()
              .toLowerCase()
              .replace(' ', '-');

            group.active[0] = '[class*="' + searchTerm + '"]';
          }
        });
  	    group.active.length && (group.tracker = 0);
      }

      self.concatenate();
    },

    // The "concatenate" method will crawl through each group, concatenating filters as desired:

    concatenate: function(){
      var self = this,
  		  cache = '',
  		  crawled = false,
  		  checkTrackers = function(){
          var done = 0;

          for(var i = 0, group; group = self.groups[i]; i++){
            (group.tracker === false) && done++;
          }

          return (done < self.groups.length);
        },
        crawl = function(){
          for(var i = 0, group; group = self.groups[i]; i++){
            group.active[group.tracker] && (cache += group.active[group.tracker]);

            if(i === self.groups.length - 1){
              self.outputArray.push(cache);
              cache = '';
              updateTrackers();
            }
          }
        },
        updateTrackers = function(){
          for(var i = self.groups.length - 1; i > -1; i--){
            var group = self.groups[i];

            if(group.active[group.tracker + 1]){
              group.tracker++;
              break;
            } else if(i > 0){
              group.tracker && (group.tracker = 0);
            } else {
              crawled = true;
            }
          }
        };

      self.outputArray = []; // reset output array

  	  do{
  		  crawl();
  	  }
  	  while(!crawled && checkTrackers());

      self.outputString = self.outputArray.join();

      // If the output string is empty, show all rather than none:

      !self.outputString.length && (self.outputString = 'all');

      console.log(self.outputString);

      // ^ we can check the console here to take a look at the filter string that is produced

      // Send the output string to MixItUp via the 'filter' method:

  	  if(self.$container.mixItUp('isLoaded')){
      	self.$container.mixItUp('filter', self.outputString);
  	  }
    }
  };

  // On document ready, initialise our code.

  $(function(){

    // Initialize multiFilter code

    multiFilter.init();

    // Instantiate MixItUp

    $('#Container').mixItUp({
      controls: {
        enable: true // we won't be needing these
      },
      animation: {
        easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
        //queueLimit: 3,
        duration: 600
      }
    });
  });







})//end document.ready
