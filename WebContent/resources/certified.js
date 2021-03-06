/**
 * Functions added by visolve
 * 001: Pagination for Table. Note: Include DataTable library files
 */
function loadCertifiedTable() {
	$("#certified-table").empty();
	$("#status-loading").show();
	$.ajax({
	    url: "CertificationServlet",
	    data: {
	        request: "getcertified",
	        locale: getCurrentLanguage()
	    },
	    type: "GET",
	    dataType : "json",
	    success: function( json ) {
	    	$("#status-loading").hide();
	    	fillCertifiedTable(json);
	    },
	    error: function( xhr, status, errorThrown ) {
	    	$("#submission-status-loading").hide();
	    	handleError( xhr, status, errorThrown);
	    }
	});
}

function fillCertifiedTable(submissions) {
	$("#certified-table").empty();
	var html = '<thead><tr><th class="cert-table-cell all translate" data-i18n="Organization" >Organization</th><th class="cert-table-cell none translate" data-i18n="Specification Version">Specification Version</th><th class="cert-table-cell none translate" data-i18n="Contact Email">Contact Email</th><th class="cert-table-cell none translate" data-i18n="Contact Name">Contact Name</th></tr></thead>\n<tbody>';
	for (var i = 0; i < submissions.length; i++) {
		if (submissions[i].approved) {
			html += '<tr id="submission-';
			html += submissions[i].id;
			html += '"></td><td>';
			html += submissions[i].user.organization;
			html += '</td><td>';
			var specVersion = submissions[i].specVersion;
	    	var versionParts = specVersion.split( "." );
	    	if ( versionParts.length > 2 ) {
	    		specVersion = versionParts[0] + "." + versionParts[1];
	    	}
	    	html += specVersion;
			html += '</td><td >';
			if (submissions[i].user.emailPermission) {
				html += submissions[i].user.email;
			} else {
				html += '<span class="translate" data-i18n="Not Available" >Not Available</span>';
			}
			html += '</td><td >';
			if (submissions[i].user.namePermission) {
				html += submissions[i].user.name;
			}else {
				html += '<span class="translate" data-i18n="Not Available" >Not Available</span>';
			}			
			html += '</td></tr>\n';
		}
	}
	$("#certified-table").html(html);
	
	//******************** 001 starts here *******************//
	$('#certified-table').DataTable({
		"sDom": '<"top"f>rt<"bottom"lpi><"clear">',
		"oLanguage": {
			  "sUrl": "resources/locales/"+(url('?locale') ||'en')+"/translation.json"
			},
			"fnDrawCallback": function (oSettings) {
				$('.translate').localize();
			}	
	});
	//******************** 001 ends here *******************//
}

$(document).ready( function() {
	loadCertifiedTable();
});