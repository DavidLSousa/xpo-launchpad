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
