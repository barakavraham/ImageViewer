import ViewPort from "./ViewPort.class.js";

(function() {
    const $container = document.querySelector(".container");
    const $fileInput = document.querySelector("#img-file");
    const $expand = document.querySelector(".expand");
    const $collapse = document.querySelector(".collapse");
    const $zoomContainer = document.querySelector('#zoom-tools-container');
    let viewPort = null;

    function init() {
        initListeners();
    }

    function initListeners() {
        document.querySelector(".zoom-in").addEventListener("click", () => {
            viewPort.zoomIn();
        });
        document.querySelector(".zoom-out").addEventListener("click", () => {
            viewPort.zoomOut();
        });
        document.querySelector(".zoom-reset").addEventListener("click", () => {
            viewPort.zoomReset();
        });

        document.querySelector(".expand").addEventListener("click", () => {
            $container.style.width = '100%';
            $container.style.height = '93vh';
            $zoomContainer.style.width = '100%'
            $expand.style.display = "none";
            $collapse.style.display = "inline-block";
        })

        document.querySelector(".collapse").addEventListener("click", () => {
            $container.style.width = '85%';
            $container.style.height = '80vh';
            $zoomContainer.style.width = '85%';
            $collapse.style.display = "none";
            $expand.style.display = "inline-block";
        })

        $fileInput.addEventListener("change", () => {
            $container.innerHTML = "";
            const file_path = URL.createObjectURL($fileInput.files[0]);
            viewPort = new ViewPort(file_path);
            $container.appendChild(viewPort.$viewPort);
        })
    }
    init();
})();
