APP_JSON = app.json
BACKUP_JSON = .app.json.bak
ANDROID_HOME_PATH = /Users/davidsousa/Library/Android/sdk
VERSION ?=

# ============================================
# Version bumps (standalone)
# ============================================

version-patch:
	@node -e " \
	  const fs = require('fs'); \
	  const app = JSON.parse(fs.readFileSync('$(APP_JSON)')); \
	  const v = app.expo.version.split('.'); \
	  v[2] = Number(v[2]) + 1; \
	  app.expo.version = v.join('.'); \
	  fs.writeFileSync('$(APP_JSON)', JSON.stringify(app, null, 2) + '\n'); \
	  console.log('Version:', app.expo.version);"

version-minor:
	@node -e " \
	  const fs = require('fs'); \
	  const app = JSON.parse(fs.readFileSync('$(APP_JSON)')); \
	  const v = app.expo.version.split('.'); \
	  v[1] = Number(v[1]) + 1; \
	  v[2] = 0; \
	  app.expo.version = v.join('.'); \
	  fs.writeFileSync('$(APP_JSON)', JSON.stringify(app, null, 2) + '\n'); \
	  console.log('Version:', app.expo.version);"

version-major:
	@node -e " \
	  const fs = require('fs'); \
	  const app = JSON.parse(fs.readFileSync('$(APP_JSON)')); \
	  const v = app.expo.version.split('.'); \
	  v[0] = Number(v[0]) + 1; \
	  v[1] = 0; \
	  v[2] = 0; \
	  app.expo.version = v.join('.'); \
	  fs.writeFileSync('$(APP_JSON)', JSON.stringify(app, null, 2) + '\n'); \
	  console.log('Version:', app.expo.version);"

# ============================================
# Internal: pre/post build helpers
# ============================================

_pre-build:
	@cp $(APP_JSON) $(BACKUP_JSON)
	@node -e " \
	  const fs = require('fs'); \
	  const app = JSON.parse(fs.readFileSync('$(APP_JSON)')); \
	  const version = '$(VERSION)'; \
	  if (version) { \
	    const v = app.expo.version.split('.'); \
	    if (version === 'patch') { v[2] = Number(v[2]) + 1; } \
	    else if (version === 'minor') { v[1] = Number(v[1]) + 1; v[2] = 0; } \
	    else if (version === 'major') { v[0] = Number(v[0]) + 1; v[1] = 0; v[2] = 0; } \
	    else { console.error('VERSION invalido:', version, '(use patch, minor ou major)'); process.exit(1); } \
	    app.expo.version = v.join('.'); \
	    console.log('Version:', app.expo.version); \
	  } \
	  const next = Number(app.expo.ios.buildNumber || '0') + 1; \
	  app.expo.ios.buildNumber = String(next); \
	  app.expo.android.versionCode = next; \
	  fs.writeFileSync('$(APP_JSON)', JSON.stringify(app, null, 2) + '\n'); \
	  console.log('Build number:', next);"

_post-build-ok:
	@rm -f $(BACKUP_JSON)
	@echo "Build concluido com sucesso!"

_post-build-fail:
	@cp $(BACKUP_JSON) $(APP_JSON)
	@rm -f $(BACKUP_JSON)
	@echo "Build falhou. Versoes revertidas."
	@exit 1

# ============================================
# Builds
# ============================================

build-android:
	@$(MAKE) _pre-build VERSION=$(VERSION)
	@ANDROID_HOME=$(ANDROID_HOME_PATH) eas build --profile production --platform android --local \
	  && $(MAKE) _post-build-ok \
	  || $(MAKE) _post-build-fail

build-ios:
	@$(MAKE) _pre-build VERSION=$(VERSION)
	@eas build --profile production --platform ios --local \
	  && $(MAKE) _post-build-ok \
	  || $(MAKE) _post-build-fail

build-all:
	@$(MAKE) _pre-build VERSION=$(VERSION)
	@ANDROID_HOME=$(ANDROID_HOME_PATH) eas build --profile production --platform android --local \
	  && eas build --profile production --platform ios --local \
	  && $(MAKE) _post-build-ok \
	  || $(MAKE) _post-build-fail

.PHONY: version-patch version-minor version-major _pre-build _post-build-ok _post-build-fail build-android build-ios build-all lint-fix run run-android-device

# ============================================
# Development
# ============================================

lint-fix:
	@npx eslint . --fix

run:
	@npx expo run

run-a:
	@npx expo run:android --device

# ============================================
# Testes
# ============================================

test:
	@npx jest



# ============================================
# Dependências (Yarn / Expo)
# ============================================

install:
	@yarn install

fix-deps:
	@npx expo install --fix

add:
	@yarn add $(PKG)

remove:
	@yarn remove $(PKG)

audit:
	@yarn audit

audit-fix:
	@yarn audit --fix

audit-force:
	@yarn audit --force
