function customEventListener(){
    
    $(document).keydown(function(e) {
        //$('.invisible-input').focus();
        if (e.ctrlKey && e.keyCode == 13) {
            if (settingsChecker()) {
                testStarter('custom')
                $(document).off()
            }
            
        }
    })
}