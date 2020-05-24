import { ApiLectureProblems } from '../../controller/lecture.js'
import { ProblemEvent } from './problem.js'
import { SelectLayout } from './layout.js'

const Content = ()=> {
	let view = `
		<div id="problems_title" class="content_container_title noselect">Welcom To QOJ! Select Contents.</div>
		<div class="content_container_time_cont noselect">
			Start Time : <span id="class_start">Now</span>
		</div>
		<div id="class_container" class="content_container_class_cont noselect"></div>
	`;

	return view;
}

// 해당 주차 문제들 가져오기
const ContentEvent = (class_id)=> {
	let data = {'pg_name': 'SELECT 연습문제', 'start_time': "Now", 'problems': [{'p_name': "학생을 찾아라!", 'user_score': 0, 'p_id': 1}]}; // 임시데이터
	// ApiLectureProblems(class_id, (data)=> {
		let title = document.querySelector("#menu_title").dataset.name;
		let class_name = data['pg_name'];
		document.querySelector("#problems_title").textContent = title+' - '+class_name;

		document.querySelector("#class_start").textContent = data['start_time']

		let target = document.querySelector("#class_container");
		target.innerHTML = "";

		for (let problem of data['problems']) {
			let problem_cont = document.createElement('div');
			problem_cont.classList.add(...['content_container_class', 'box', 'noselect', 'pointer', 'wow', 'animated', 'flipInY']);

			let problem_title = document.createElement('div');
			problem_title.classList.add('content_container_class_title');
			problem_title.textContent = problem['p_name'];
			problem_cont.append(problem_title);

			let problem_score_box = document.createElement('div');
			problem_score_box.classList.add('content_container_class_score_box');
			problem_score_box.innerHTML = `<span>My Score</span><span>/ 100</span><span class="content_container_class_score">${problem['user_score']}</span></div>`
			problem_cont.append(problem_score_box);

			let problem_arrow = document.createElement('div');
			problem_arrow.classList.add('class_content_arrow');
			problem_arrow.innerHTML = 'solve  <i class="fas fa-arrow-right"></i>';
			problem_cont.append(problem_arrow);

			problem_cont.addEventListener("click", ()=> {
				history.pushState(null,null,location.href.split('lecture')[3]);
				// 문제 View는 시험모드때문에 History가 없음.
				SelectLayout(1);			// Layout 변경
				ProblemEvent(problem['p_id']);
			})

			target.append(problem_cont);
		}
	// });
}

const ContentUrlCehck = ()=> {
	if (location.href.split("#cn?")[1] == undefined) {
		return;
	} else {
		let class_id = location.href.split("#cn?")[1];
		if (class_id.indexOf('#') != -1) class_id = location.href.split("#cn?")[1].split('#')[0];
		ContentEvent(class_id);
	}
}

export { Content, ContentEvent, ContentUrlCehck }