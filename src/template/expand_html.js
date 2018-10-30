function load_div_inside(div_id,html_path) {
	var tag1 = '<object type="text/html" data="';
	var tag2 = '" ></object>';
	var tag = tag1.concat(html_path,tag2);
    document.getElementById(div_id).innerHTML=tag;
}

