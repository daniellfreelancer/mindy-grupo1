const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    Swal.fire("Gracias!", "Su mensaje fue enviado exitosamente.", "Exito").then(
        function () {
            form.reset();
        }
    );
});