

function updateGuestData(guestId) {
  var data = window.guestsData[guestId];
  $('#order_guest_name').val(data.name);
  if(guestId > 0) {
    $("#order_guest_id_input .select2").addClass('existing-guest');
    $('#order_guest_email').val(data.email);
    $('#order_guest_phone').val(data.phone);
  }
  else {
    $("#order_guest_id_input .select2").removeClass('existing-guest');
    $('#order_guest_email').val('');
    $('#order_guest_phone').val('');
  }
}

function addReserveForm() {
  if(typeof(window.reserveCount) === 'undefined') { window.reserveCount = 0; }
  window.reserveCount += 1;
  var newFormIndex = window.reserveCount;
  var newFormHtml = $('.hidden-reserve-form-mold').html().replace(/reserve0/g, ('reserve' + newFormIndex));
  newFormHtml = newFormHtml.replace('Registro 0', ('Registro ' + newFormIndex));
  var newForm = $(newFormHtml);
  newForm.find("span.select2").remove();
  newForm.find("select").select2();
  newForm.appendTo('.visible-reserve-forms-container');
  newForm.find('input[type=checkbox]').change(function () {
    setPriceInputs();
  });
  newForm.find('.site-select2').change(function () {
    setupBaseFee(newFormIndex);
  });
  newForm.find('.base_fee-select2').change(function () {
    setupBaseFee(newFormIndex);
  });
  newForm.find('.reserve-date-input').datepicker({
    dateFormat: 'dd/mm/yy'
  });

  newForm.find('.reserve-price-related-input').change(function () {
    setPriceInputs();
  });

  newForm.find('.reserve-price-direct-input').change(function () {
    moveToCustom(newFormIndex);
  });

  newForm.find('.reserve-date-input').change(function () {
    
  });
  
  setupBaseFee(newFormIndex);
  return newFormIndex;
}

function populateReserveForm(reserveData, formIndex) {
  $('#registry_modification_reserve' + formIndex + '_id').val(reserveData.id);
  $('#registry_modification_reserve' + formIndex + '_registry_date').val(reserveData.registry_date);
  $('#registry_modification_reserve' + formIndex + '_shareholder_id').val(reserveData.shareholder_id);
  $('#registry_modification_reserve' + formIndex + '_shares_count').val(reserveData.shares_count);
  $('#registry_modification_reserve' + formIndex + '_paid_shares_count').val(reserveData.paid_shares_count);
  $('#registry_modification_reserve' + formIndex + '_subscription_date').val(reserveData.subscription_date);
  $('#registry_modification_reserve' + formIndex + '_serie').val(reserveData.serie);
  $('#registry_modification_reserve' + formIndex + '_category').val(reserveData.category);
  $('#registry_modification_reserve' + formIndex + '_share_price').val(reserveData.share_price);
  $('#registry_modification_reserve' + formIndex + '_equity_percentage').val(reserveData.equity_percentage);
  $('#registry_modification_reserve' + formIndex + '_has_agreement').val(reserveData.has_agreement);
  $('#registry_modification_reserve' + formIndex + '_create_modif').val(reserveData.create_modif);
  $('#registry_modification_reserve' + formIndex + '_outdate_modif').val(reserveData.outdate_modif);
  $('#registry_modification_reserve' + formIndex + '_outdate_date').val(reserveData.outdate_date);
  $('#registry_modification_reserve' + formIndex + '_has_collateral').val(reserveData.has_collateral);
}

function loadReserves() {
  var reserves = $('#reserves-data-container').data().reserves;
  if(reserves.length === 0) {
    addReserveForm();
    return;
  }
  var ri = 0;
  for (ri = 0; ri < reserves.length; ri++) {
    var newFormIndex = addReserveForm();
    populateReserveForm(reserves[ri], newFormIndex);
  }
}

function formatDateDBtoCL(dateDbStr) {
  var day = dateDbStr.substring(8,10);
  var month = dateDbStr.substring(5,7);
  var year = dateDbStr.substring(0,4);
  return day + '/' + month + '/' + year;
}

function clStrToDate(dateClStr) {
  var day = dateClStr.substring(0,2);
  var month = dateClStr.substring(3,5);
  var year = dateClStr.substring(6,10);
  return new Date(year + '-' + month + '-' + day);
}





function setupBaseFee(ri) {
  var id = parseInt($('#order_reserve' + ri + '_id').val());
  var siteId = parseInt($('#order_reserve' + ri + '_site_id').val());
  if(!isNaN(id) || isNaN(siteId)) { // will return if reserve has id or site has not been chosen
    hideBaseFeeExcept(ri, null);
    return;
  }
  var siteCategoryData = $('#reserves-data-container').data().siteCategories;
  var siteCategory = siteCategoryData[siteId];
  hideBaseFeeExcept(ri, siteCategory);

  var currentBaseFee = $('#order_reserve' + ri + '_' + siteCategory + '_fee').val();
  if(currentBaseFee === 'custom') {
    return;
  }
  var fee;
  if(currentBaseFee === '') {
    fee = findDefaultBaseFee(siteCategory);
    if(typeof(fee) !== 'object') { return; }
    $('#order_reserve' + ri + '_' + siteCategory + '_fee').val(fee.id).trigger('change.select2');
  } else {
    var baseFees = $('#reserves-data-container').data().fees;
    fee = baseFees[parseInt(currentBaseFee)];
  }
  if(typeof(fee) !== 'object') { return; }
  loadBaseFeeValues(ri, fee);
}



// DEPRECATED
// Llamar cada vez que hay un cambio de instalación y no hay id y la tarifa no es custom
// function loadBaseFee(ri) {
//   $('.reserve' + ri + '-fee').closest('li.select.input').hide();
//   var siteId = parseInt($('#order_reserve' + ri + '_site_id').val());
//   if(typeof(siteId) !== 'number') { return; }
//   var siteCategoryData = $('#reserves-data-container').data().siteCategories;
//   var siteCategory = siteCategoryData[siteId];
//   $('#order_reserve' + ri + '_' + siteCategory + '_fee_input').show();
//   var fee = findDefaultBaseFee(siteCategory);
//   if(typeof(fee) !== 'object') { return; }
//   $('#order_reserve' + ri + '_' + siteCategory + '_fee').val(fee.id).trigger('change');
// }

function hideBaseFeeExcept(ri, siteCategory) {
  $('.reserve' + ri + '-fee').closest('li.select.input').hide();
  $('.reserve' + ri + '-fee').removeClass('active-base-fee-select2');
  if(typeof(siteCategory) !== 'string') { return; }
  $('#order_reserve' + ri + '_' + siteCategory + '_fee_input').show(); // if siteCategory null, all will be hidden
}

function moveToCustom(ri) {
  var siteId = parseInt($('#order_reserve' + ri + '_site_id').val());
  var siteCategoryData = $('#reserves-data-container').data().siteCategories;
  var siteCategory = siteCategoryData[siteId];
  $('#order_reserve' + ri + '_' + siteCategory + '_fee').val('custom').trigger('change');
}

function findDefaultBaseFee(siteCategory) {
  var baseFeesArray = Object.values($('#reserves-data-container').data().fees);
  var bf_i = 0;
  for (bf_i = 0; bf_i < baseFeesArray.length; bf_i++) {
    var fee = baseFeesArray[bf_i];
    if (fee.site_category === siteCategory && fee.default_fee) {
      return fee;
    }
  }
}


$(function () {
  console.log('el florin');
  if($('.hidden-reserve-form-mold').length === 0) { return; } // abort if current view is not main-form
  else {
    loadReserves();
  }

  $("#order_guest_id_input").on("change", function() {
    var selectedGuestId = $("#order_guest_id_input select").val();
    updateGuestData(selectedGuestId);
  });

  $('.datepicker').datepicker({
      dateFormat: 'dd/mm/yy'
  });
});

/// src https://www.quora.com/How-do-I-get-the-number-of-days-between-two-dates-in-Javascript
Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();    // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return
  return Math.floor(difference_ms/one_day);
};
