'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	//$('#'+projectID + ' .details').html('bar');



	console.log("User clicked on project " + idNumber);
	var projectURL = "/project/"+idNumber;
	$.get(projectURL, function (result) {
		addProject(result, projectID);
	});
	$.get("/palette",randomizeColors);
	console.log(projectURL);
}

function addProject(result, projectID){
	console.log(result);
	$('#'+projectID).find('img').attr('src', result.image);
    $('#'+projectID).find('.details').html('<p>'+result.title+'</p>');
    $('#'+projectID).find('.details').append('<p>'+result.date+'</p>');
    $('#'+projectID).find('.details').append('<p>'+result.summary+'</p>');

}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	var paletteURL = "/palette";
	console.log(paletteURL);
	$.get(paletteURL, addColor);
}

function addColor(result){
	console.log(result);
	var colors = result.colors.hex;
	console.log("Entered addColor");
	console.log(colors);
	$('body').css('background-color', colors[0]);
    $('.thumbnail').css('background-color', colors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
    $('p').css('color', colors[3]);
    $('.project img').css('opacity', .75);
}