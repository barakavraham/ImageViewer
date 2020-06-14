class ViewPort {
    $viewPort = null;
    zoom = 100;

    constructor(imageLink) {
        this.image = imageLink;
        this.$el = document.createElement("img");
        this.init();
    }

    init() {
        const $container = document.querySelector(".container");
        this.$el.src = `${this.image}`;
        this.$el.style.blockSize = `${this.zoom}%`;
        let clicked = false, clickY, clickX;

        $container.addEventListener("wheel", (event) => {
            if (event.altKey) {
                event.preventDefault();
                event.deltaY < 0 ? this.zoomIn() : this.zoomOut();
            }
         })

        $container.addEventListener("mousemove", e => {
            clicked && updateScrollPos(e);
        })

        $container.addEventListener("mousedown", e => {
            e.preventDefault();
            clicked = true;
            clickY = e.pageY - $container.offsetTop;
            clickX = e.pageX - $container.offsetLeft;
        })

        window.addEventListener("mouseup", () => {
            clicked = false;
        })

        const updateScrollPos = e => {
            const moveY = $container.scrollTop + clickY - (e.pageY - $container.offsetTop);
            const moveX = $container.scrollLeft + clickX - (e.pageX - $container.offsetLeft);    
            $container.scrollTo(moveX, moveY);
            clickY = e.pageY - $container.offsetTop;
            clickX = e.pageX - $container.offsetLeft;
        }

        this.$viewPort = this.$el;
    }

    zoomIn() {
        this.zoom += 25;
        this.$el.style.blockSize = `${this.zoom}%`;
    }
    zoomOut() {
        if (this.zoom > 25) {
            this.zoom -= 25;
            this.$el.style.blockSize = `${this.zoom}%`;
        }
    }
    zoomReset() {
        this.zoom = 100;
        this.$el.style.blockSize = `${this.zoom}%`;
    }
}

export default ViewPort;
