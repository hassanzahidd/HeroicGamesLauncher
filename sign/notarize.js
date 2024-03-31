require('dotenv').config()
const { notarize } = require('@electron/notarize')

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin' || process.env.CSC_IDENTITY_AUTO_DISCOVERY === 'false') {
    console.log('Notarizing skipped')
    return
  }

  console.log('Notarizing Application...')

  const appName = context.packager.appInfo.productFilename

  return await notarize({
    appPath: `${appOutDir}/${appName}.app`,
    teamId: process.env.TEAMID,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD
  })
}
