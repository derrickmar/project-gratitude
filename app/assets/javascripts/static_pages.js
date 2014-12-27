$(document).on('page:load', function() {
    Paloma.executeHook();
    Paloma.engine.start();
});

$(document).ready(function() {
    Dropzone.autoDiscover = false;

    // grap our upload form by its id
    $("#image_upload").dropzone({
        maxFiles: 1,
        // restrict image size to a maximum 1MB
        maxFilesize: 10,
        acceptedFiles: "image/*",
        // changed the passed param to one accepted by
        // our rails app
        paramName: "image[pic]",
        // addRemoveLinks: true,
        // show remove links on each image upload
        init: function() {
            this.on("sending", function(file, response) {
                $("#create-note-button").prop("disabled", true);
                $("#create-note-button").attr('value', "Loading Image...")
            });
            this.on("success", function(file, response) {
                var _this = this;
                console.log(response);
                $('#image_id_for_note').val(response.image_id);
                // TODO: Remember in note controller to clear this value of successful submission
                var remove_link = "/images/" + response.image_id
                var removeButton = Dropzone.createElement("<a class='dz-remove' href='" + remove_link + "' data-remote='true' data-method='delete' data-dz-remove>" + "Remove File" + "</a>");
                removeButton.addEventListener("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this.removeFile(file);
                })
                file.previewElement.appendChild(removeButton);
            });
            this.on("complete", function(file, response) {
                $("#create-note-button").attr('value', "Spread the gratitude")
                $("#create-note-button").prop("disabled", false);
            });
        }
    });
});