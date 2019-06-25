ionic cordova build android --prod --release -- -- --versionCode=$1 --verbose
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/eha/Documentos/se_ama/keystoresSeccionAmarilla/seccamKey    platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk seccam -storepass S3cc10n_@m@r1ll@ -keypass S3cc4m_2011
zipalign -f -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk seccam.apk
