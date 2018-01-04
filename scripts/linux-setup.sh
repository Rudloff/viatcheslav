DEBNAME=google-chrome-stable_current_amd64.deb
DEST=widevine
mkdir -p $DEST
wget https://dl.google.com/linux/direct/$DEBNAME -O $DEST/$DEBNAME
cd $DEST
ar x $DEBNAME
tar -xf data.tar.xz
