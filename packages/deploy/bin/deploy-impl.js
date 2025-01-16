const {existsAsync, writeAsync, join} = require("@eofol-util/fs")
import {execCmd} from "@eofol-util/misc"

const writeIdempotent = (pathname, content) => {
    existsAsync(pathname).then((existsResult) => {
        if (!existsResult) {
            return writeAsync(pathname, content)
        } else {
            return new Promise(() => {
            })
        }
    })
}

const CWD = process.cwd()

const init = (winscpExecutablePath, winscpLogPath, ipAddress, username, privateKeyPath, hostkey, localBuildPath, remoteDeployPath) => {
    writeIdempotent(join(CWD, workDirImpl, "deploy.bat"), `@echo off

"${winscpExecutablePath ?? "C:\dev\WinSCP\WinSCP.com"}" ^
  /log="${winscpExecutablePath ?? "C:\temp\WinSCP.log"}" /ini=nul ^
  /command ^
    "open scp://${username ?? "root"}@${ipAddress ?? "80.211.202.167"}/ -privateKey=""${privateKeyPath ?? "C:\Users\elias\OneDrive - ACEMA Credit Czech a.s\Plocha\virtual\eofol-ssh\root.ppk"}"" -hostkey=""${hostkey ?? "ssh-ed25519 255 O/WMQySV/hExzjC1mITKj5ulronkGRNKLYWlFKrHmiw"}""" ^
    "call rm -r -f ${remoteDeployPath ?? `/var/www/eofol/eofol5/`}" ^
    "call mkdir -p ${remoteDeployPath ?? `/var/www/eofol/eofol5/`}" ^
	"put ${localBuildPath ?? `c:\code\eofol5\build`}\* ${remoteDeployPath ?? `/var/www/eofol/eofol5/`}" ^
    "exit"

set WINSCP_RESULT=%ERRORLEVEL%
if %WINSCP_RESULT% equ 0 (
  echo Success
) else (
  echo Error
)

exit /b %WINSCP_RESULT%

`)
}

const deploy = (winscpExecutablePath, winscpLogPath, ipAddress, username, privateKeyPath, hostkey, localBuildPath, remoteDeployPath) => {
    init(winscpExecutablePath, winscpLogPath, ipAddress, username, privateKeyPath, hostkey, localBuildPath, remoteDeployPath)
    execCmd("deploy.bat")
}

module.exports = deploy