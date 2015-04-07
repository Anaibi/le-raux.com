$(function() {

  $(window).load(function () { console.log('window load called');

    // if a) navigation:
      // load #home-gallery imgs
      // show home section
      // load #gallery imgs

    // if b) navigation:
      // if on home page load #home-gallery imgs

      // if on gallery page load #gallery imgs
      if (isPage('gallery')) { console.log('is page gallery');
      	//loadGallery();
      	// fix gallery last li item bug on chrome gets out of position
        if ($(window).width() > 1000) {
          $('#gallery li:last-child').css('float', 'none');
    	  setTimeout(function() {
    	    $('#gallery > li:last-child').css('float', 'right');
    	  }, 200);
        }
     	
      }

    // if (imgsLoaded) {  ------------ TODO -loadGallery() not working 100% yet
      // center in all tiles
      centerImgsTiles();
    // }

    // if on detail pages, set height for gallery otherwise next section jumps
    // TODO find only css solution?
    if (isPage('detail')) {
    	setGalleryHeight();
    }
  });	

  $(window).resize(function() { console.log('window resize called');
		
	// if (imgsLoaded) {  ------------ TODO -loadGallery() not working 100% yet
      // center in all tiles
      centerImgsTiles();
    // }

    // if on detail pages, set height for gallery otherwise next section jumps
    // TODO find only css solution?
    if (isPage('detail')) {
    	setGalleryHeight();
    }

    if (isPage('gallery')) { console.log('is gallery');
    	// fix gallery last li item bug on chrome gets out of position
    	$('#gallery li:last-child').css('float', 'none');
    }

  });	


//////////////////////////////////////// MENU FUNCTIONALITY
 
	
//main menu navigation
$('#main-menu a').click(function(e){  
  //e.preventDefault();	

  // option a) all one page and scroll navigation

  // else b) consider new page load effects 

  // if on detail page load #detail and #detail-suggest imgs

});		


//////////////////////////////////////// MENU FUNCTIONALITY

 /*$('#detail-img li').on('click', function() { 
  var $clickedImg = $(this);
  var $featuredImg = $clickedImg.parent().find('.featured')

  $featuredImg.fadeOut(function() {
    $featuredImg.removeClass('featured').fadeIn(); 
  });

  $clickedImg.fadeOut().addClass('featured').fadeIn(function() {
    centerImgsTiles();
  });
});*/

/*$('#detail-img li').on('click', function() { 
  var $clickedImg = $(this);
  var $featuredImg = $clickedImg.parent().find('.featured')

  $featuredImg.fadeOut('fast', function() {
    $featuredImg.removeClass('featured').fadeIn('fast'); 
  });

  $clickedImg.fadeOut('fast').addClass('featured').fadeIn('fast', function() {
    centerImgsTiles();
  });
});*/

 /* $('#detail-img li').on('click', function() { 
  var $clickedImg = $(this);
  var $featuredImg = $clickedImg.parent().find('.featured')

  $featuredImg.removeClass('featured'); 

  $clickedImg.addClass('featured');
  
  centerImgsTiles();
});*/

$('#detail-img li').on('click', function() { 
  var $clickedImg = $(this);
  var $featuredImg = $clickedImg.parent().find('.featured')

  $featuredImg.hide(function() {
    $featuredImg.removeClass('featured').show(); 
  });

  $clickedImg.hide().addClass('featured').show(function() {
    centerImgsTiles();
  });
});

/*$('#detail-img li').on('click', function() { 
  var $clickedImg = $(this);
  var $featuredImg = $clickedImg.parent().find('.featured')

  $featuredImg.hide(200, function() {
    $featuredImg.removeClass('featured').show(300); 
  });

  $clickedImg.hide(200).addClass('featured').show(300, function() {
    centerImgsTiles();
  });
});*/

//////////////////////////////////////// FUNCTIONS	

  function loadGallery() { l();
    $.post('js/gallery.json', function(result) { 
      $.each(result, function(k, detail)	 { 
        var ul = $('#gallery > ul');
        var listItem = $('<li class="small tile-wrapper"></li>');
        var str = '<a href="/detail.html#' + detail.i + '" class="overlay-parent tile-link">';
        str = str + '<img src="'+ detail.p[0].s + '" title="' + detail.p[0].t + '" >';
        str = str + '<div class="hidden overlay"><p class="title">' + detail.p[0].t + '</p></div></a>';
        $(str).appendTo(listItem);
       ul.append(listItem);
      });
    }, "json");
  }

  function loadDetail() { l();
  
  }

  function loadDetailSuggest() { l();
	
  }

  function centerImgsTiles() { l();
  	var tiles = $('#content').find('.tile-wrapper'); 
  	$.each(tiles, function(k, v) { centerImg(v) });
  }

  function centerImg(tile) { l();
  	// center img
    var $tile = $(tile); 
    var $img = $tile.find('img');
    var img_h = $img.height(); 
  	var top = ($tile.height() - img_h) / 2;
    $img.animate({
  		'top': top
  	});

  	// fix overlay bug --why does it get different size??
  	$tile.find('.overlay').css({'height': img_h, 'top': top});
  }


  function setGalleryHeight() {
  	var h = $('#detail-img ul li.featured').height() + 3*$('#detail-img ul li.tile-wrapper').height();
  	$('#detail-img').height(h);
  }


  //////////////////////////////////////// HELPER FUNCTIONS	
  
  function isPage(id) { l();

    if (id.charAt(0) === '#') {
    	id = id.slice(1);
    }
    return (($(location).attr('pathname').indexOf(id) > 0) || !!$('body').find('#'+id).length);
  }


  //////////////////////////////////////// DEVELOPMENT FUNCTIONS

  function fillGallery() {
    // img object contains all information related with one image
      // img: { s (src), t (title), d (description) }
    var _src, _title, _description;
  
    // array of images
      // imgs: [ img ]
    var imgs = [];

    for (i=1; i<10; i++) {
      _src = 'images/00' + i + '.jpg';
  	  _title = 'imagen ' + i;
      _description = _title;

  	  var img_i = {  
        s: _src,
        t: _title,
        d: _description
      };

      imgs.push(img_i);
    }
    
    // tag object, unique id and name values 
      // tag: [ id, name ]
    var tag_1 = [ 't-01', 'tag-1' ],
        tag_2 = [ 't-02', 'tag-2' ];
  
    // list of tags
      // tags = [ tag ]
    var tags = [ tag_1, tag_2 ];
  
    /* each detail object contains all information related with one detail:
    /* unique id, associated images, title and description for the content, and 
    /* list of tags for filter options */
      // detail = { id (i), p (imgs), t (title), d (description), t (tags) }
  
    // gallery: array of details from which to retrieve img and title
      // gallery = [ detail ]
    var gallery = [], _imgs = [], _id, _tags;
    var detail_i;
  
    for (i=1; i<12; i++) {
      _id = i;
  	  _title = 'LOREM IPSUM DOLOR SIT AMET CONSECTETUR';
      _tags = tags;
      _description = 'Lorem ipsum dolor sit amet';
    
      _imgs = imgs.slice(6); 
    
      detail_i = {
        i: _id,
        p: _imgs,
        t: _title,
        d: _description,
        t: _tags
      }

      gallery.push(detail_i);
    }	
  
    var gallery_json = JSON.stringify(gallery); 
  }
  
  function l() {  
    console.log((l.caller).toString().slice(0,25) + ' called');
  };

});
