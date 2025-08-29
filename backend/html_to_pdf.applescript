#!/usr/bin/osascript

on run argv
    set htmlFile to item 1 of argv
    set pdfFile to item 2 of argv
    
    set htmlPath to POSIX path of ((path to current application as text) & "::" & htmlFile)
    set htmlURL to "file://" & htmlPath
    
    tell application "Safari"
        activate
        set myWindow to make new document with properties {URL:htmlURL}
        
        delay 3 -- Wait for page to load
        
        tell myWindow
            set current tab to tab 1
        end tell
        
        delay 2
        
        -- Print to PDF
        tell application "System Events"
            tell process "Safari"
                keystroke "p" using command down
                delay 1
                
                click menu button "PDF" of sheet 1 of window 1
                delay 0.5
                
                click menu item "Save as PDF…" of menu 1 of menu button "PDF" of sheet 1 of window 1
                delay 1
                
                -- Set filename
                keystroke pdfFile
                delay 0.5
                
                -- Save
                click button "Save" of sheet 1 of sheet 1 of window 1
                delay 2
            end tell
        end tell
        
        close myWindow
    end tell
end run
