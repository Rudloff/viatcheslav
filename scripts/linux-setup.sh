DEBNAME=google-chrome-stable_56.0.2924.87-1_amd64.deb
DEST=widevine
mkdir -p $DEST
wget https://dl.google.com/linux/deb/pool/main/g/google-chrome-stable/$DEBNAME -O $DEST/$DEBNAME
cd $DEST
ar x $DEBNAME
tar -xf data.tar.xz