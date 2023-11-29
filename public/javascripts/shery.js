function locoMotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
locoMotive();

function allAnime() {
  var tl = gsap.timeline();

  tl.to('.green-page', {
    height: 0,
    duration: 2,
    ease: Expo.easeInOut
  })

    .to('.blue-page', {
      height: '100vh',
      duration: 2,
      delay: -2,
      ease: Expo.easeInOut
    })

    .to('.white-page', {
      height: '100vh',
      duration: 2,
      delay: -1.4,
      ease: Expo.easeInOut
    })


}

function spanInjectedToReveal() {
  document.querySelectorAll('.reveal')
    .forEach(function (elem) {
      let parent = document.createElement('span');
      let child = document.createElement('span');

      parent.classList.add('parent');
      child.classList.add('child');

      child.innerHTML = elem.innerHTML;
      parent.appendChild(child);

      elem.innerHTML = "";
      elem.appendChild(parent);

    });
} 
spanInjectedToReveal();

var timeLine = gsap.timeline();

timeLine.from('.child span',{
  x:100,
 stagger:.2,
 duration:1.4,
 ease:Power3.easeInOut
});

timeLine.to('.parent .child',{
  y:'-100%',
  duration:1,
  ease:Circ.easeInOut
});


timeLine.to('.loader',{
  height:0,
  duration:1,
  ease:Circ.easeInOut
});

timeLine.to('.loader_under',{
  height:"100%",
  top:0,
  delay:-1.2,
  duration:1,
  ease:Circ.easeInOut
});

timeLine.to('.loader_under',{
  height:0,
  delay:-1,
  duration:1,
  ease:Circ.easeInOut
});
