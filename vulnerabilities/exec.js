const express = require('express');
const router = express.Router()

const { exec, execFile, spawn }  = require('child_process');
const { normalize } = require('path');

// Allow list for commands
const CMD_ALLOWLIST = {
    "list": "ls",
    "date": "date"
}

const GZIP_ALLOW_DIR = "/data";

router.post('/ping', (req,res) => {
    // TODO: Fix this vulnerability as an exercise.
    // Validate the url and only support an allowlist for domain names to avoid DDoS!
    exec(req.body.url, (error) => {
        if (error) {
            return res.send('error');
        }
        res.send('pong')
    })

})

router.post('/gzip', (req,res) => {
    // Normalize the path and compare the prefix
    const file_path = normalize(req.query.file_path);
    if (file_path.startsWith(GZIP_ALLOW_DIR)) {
        // execFile is a safer alternative
        execFile(
            'gzip', [file_path],
            function (err, data) {
            console.log('err: ', err)
            console.log('data: ', data);
            res.send('done');
        });
    } else {
        res.send("Validation error")
    }
})

router.get('/run', (req,res) => {
   let cmd = req.params.cmd;
   runMe(cmd, res)
});

function runMe(cmd, res){
//    return spawn(cmd);
    // Suggestion: Have a allowlist of commands.
    if (CMD_ALLOWLIST[cmd]) {
        const cmdRunning = spawn(CMD_ALLOWLIST[cmd], []);
        cmdRunning.on('close', (code) => {
            res.send(`child process exited with code ${code}`);
        });
    } else {
        res.send("Validation error");
    }
}

module.exports = router