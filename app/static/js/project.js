
/**
* @description
* Vanilla Javascript Project Implementation
* 
* @class
* @param {array} [options.projectData = []]        - Specifies data for project, default is [].

*/

Project = function(options) {

    var projectData = options.projectData || [];


    renderProject();

    function renderDetail(projectData) {
        var div = document.createElement('div');
        for(key in user) {
            var span = document.createElement('span');
            var br = document.createElement('br');
            span.innerHTML = key + ': ' + user[key];
            div.appendChild(span);
            div.appendChild(br);
        }

        return div;
    }

    function renderProject() {

        var rootElements = document.getElementsByClassName('project-detail');
        if(!rootElements) return;

        var projectDetail = renderDetail(projectData);

        //clear ProjectPage
        rootElement.innerHTML = '';
        // refresh datagrid
        rootElement.appendChild(projectDetail);
    }
}
