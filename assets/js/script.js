// const menu = document.querySelectorAll(".list_more");

// function toggle() {
//     const content = this.nextElementSibling;
//     content.classList.toggle("is-open");
//     content.animate([{opacity: '0'}, {opacity: '1'}], 1000)
// }

// for (let i = 0; i < menu.length; i++) {
//     menu[i].addEventListener("click", toggle);
// }
// メニューを開く関数
const slideDown = (el) => {
    el.style.height = 'auto'; //いったんautoに
    let h = el.offsetHeight; //autoにした要素から高さを取得
    el.style.height = h + 'px';
    el.animate([ //高さ0から取得した高さまでのアニメーション
      { height: 0 },
      { height: h + 'px' }
    ], {
      duration: 300, //アニメーションの時間（ms）
     });
};

// メニューを閉じる関数
const slideUp = (el) => {
  el.style.height = 0;
};

let activeIndex = null; //開いているアコーディオンのindex

//アコーディオンコンテナ全てで実行
const accordions = document.querySelectorAll('.acc');
accordions.forEach((accordion) => {

  //アコーディオンボタン全てで実行
  const accordionBtns = accordion.querySelectorAll('.accBtn');
  accordionBtns.forEach((accordionBtn, index) => {
    accordionBtn.addEventListener('click', (e) => {
      activeIndex = index; //クリックされたボタンを把握
      e.target.parentNode.classList.toggle('active'); //ボタンの親要素（=ul>li)にクラスを付与／削除
      const content = accordionBtn.nextElementSibling; //ボタンの次の要素（=ul>ul）
      if(e.target.parentNode.classList.contains('active')){
        slideDown(content); //クラス名がactive（＝閉じていた）なら上記で定義した開く関数を実行
      }else{
        slideUp(content); //クラス名にactiveがない（＝開いていた）なら上記で定義した閉じる関数を実行
      }
      accordionBtns.forEach((accordionBtn, index) => {
        if (activeIndex !== index) {
          accordionBtn.parentNode.classList.remove('active');
          const openedContent = accordionBtn.nextElementSibling;
          slideUp(openedContent); //現在開いている他のメニューを閉じる
        }
      });
      //スクロール制御のために上位階層ulのクラス名を変える
      let container = accordion.closest('.scroll-control'); //sroll-controlnのクラス名である親要素を取得
      if(accordionBtn.parentNode.classList.contains('active') == false && container !== null ){
        container.classList.remove('active')
      }else if (container !== null){
        container.classList.add('active')
      }
    });
  });
});

const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');

ham.addEventListener('click', function () {

  ham.classList.toggle('active');
  nav.classList.toggle('active');
  document.getElementById("nav-wrapper").classList.toggle("display");
});