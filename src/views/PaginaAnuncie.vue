<template>
	<div class="cr-anuncie-container">
		<main class="cr-main">
			<section class="cr-hero cr-hero-compact">
				<div class="cr-hero-card">
					<div class="cr-hero-content">
						<h1>
							Anuncie seu imóvel<br />
							na Crédito Real!<br />
							É rápido e grátis.
						</h1>
						<ul class="cr-list">
							<li>✅ Cadastramento 100% online.</li>
							<li>✅ Seu imóvel anunciado em até 2h.*</li>
							<li>✅ Atendimento personalizado para seu imóvel.</li>
						</ul>
						<div class="cr-btn-group">
							<button class="cr-btn cr-btn-main" @click="showModal = true">Quero vender</button>
						</div>
					</div>
					<div class="cr-hero-img">
						<img src="@/assets/img/image.png" alt="Banner Primeiro Lar" />
					</div>
				</div>
			</section>
			<section class="cr-stats">
				<div class="cr-stat">
					<span class="cr-stat-num">+ 90</span>
					<span class="cr-stat-label">anos de mercado</span>
				</div>
				<div class="cr-stat">
					<span class="cr-stat-num">+ 150</span>
					<span class="cr-stat-label">franquias em 4 estados</span>
				</div>
				<div class="cr-stat">
					<span class="cr-stat-num">+ 1450</span>
					<span class="cr-stat-label">corretores parceiros</span>
				</div>
				<div class="cr-stat">
					<span class="cr-stat-num">+ 32 mil</span>
					<span class="cr-stat-label">imóveis administrados locados</span>
				</div>
			</section>
		</main>

		<!-- Modal lateral -->
		<div v-if="showModal" class="side-modal-overlay" @click.self="showModal = false">
			<div class="side-modal">
				<div class="side-modal-header">
					<h2 v-if="modalStep === 1">Antes de começar, precisamos das suas informações de contato</h2>
					<h2 v-else-if="modalStep === 2">Agora, nos conte que tipo de imóvel gostaria de anunciar?</h2>
					   <button class="side-modal-close" @click="showModal = false" aria-label="Fechar">
						   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							   <path d="M6 6L18 18" stroke="#222" stroke-width="2" stroke-linecap="round"/>
							   <path d="M18 6L6 18" stroke="#222" stroke-width="2" stroke-linecap="round"/>
						   </svg>
					   </button>
				</div>
				<!-- Etapa 1: Formulário de contato -->
				<form v-if="modalStep === 1" class="side-modal-form" @submit.prevent>
					<label>Nome
						<input type="text" v-model="form.nome" placeholder="Seu Nome" />
					</label>
					<label>E-mail
						<input type="email" v-model="form.email" placeholder="Seu e-mail" @blur="validateEmail" :class="{'input-error': emailError}" />
						<span v-if="emailError" class="input-error-msg">Informe um e-mail válido.</span>
					</label>
					<label>Telefone
						<input type="tel" v-model="form.telefone" placeholder="Seu telefone" @input="formatTelefone" maxlength="15" :class="{'input-error': telefoneError}" />
						<span v-if="telefoneError" class="input-error-msg">Informe um telefone válido. Ex: (99) 99999-9999</span>
					</label>
					<p class="side-modal-priv">
						Ao enviar mensagem você concorda em compartilhar seus dados de acordo com a Política de Privacidade da Imóveis Crédito Real, disponível para acesso, além de estar ciente e concordar em receber todas as comunicações relativas ao seu cadastro.
					</p>
					<button class="side-modal-submit" :disabled="!form.nome || emailError || telefoneError" @click="nextStep">Continuar</button>
				</form>
				<!-- Etapa 2: Escolha do tipo de imóvel -->
				<div v-else-if="modalStep === 2" class="side-modal-step2">
					<div class="side-modal-options">
						<button type="button" class="side-modal-option" :class="{'selected': tipoImovel === 'residencial'}" @click="tipoImovel = 'residencial'">Imóvel residencial</button>
						<button type="button" class="side-modal-option" :class="{'selected': tipoImovel === 'comercial'}" @click="tipoImovel = 'comercial'">Imóvel comercial</button>
					</div>
					<div class="side-modal-actions">
						<button class="side-modal-back" @click="modalStep = 1">Voltar</button>
						<button class="side-modal-submit" :disabled="!tipoImovel">Continuar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "PaginaAnuncie",
	data() {
		return {
			showModal: false,
			modalStep: 1,
			form: {
				nome: '',
				email: '',
				telefone: ''
			},
			emailError: false,
			telefoneError: false,
			tipoImovel: ''
		};
	},
	methods: {
		validateEmail() {
			this.emailError = !this.form.email.includes('@') || this.form.email.length < 5;
		},
		formatTelefone() {
			let val = this.form.telefone.replace(/\D/g, '');
			if (val.length > 2) {
				val = `(${val.slice(0,2)}) ${val.slice(2,7)}-${val.slice(7,11)}`;
			}
			this.form.telefone = val;
			// Validação: DDD (2 dígitos) + 9 dígitos
			const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
			this.telefoneError = !regex.test(this.form.telefone);
		},
		nextStep(e) {
			if (!this.form.nome || this.emailError || this.telefoneError) return;
			this.modalStep = 2;
			if (e) e.preventDefault();
		}
	}
};
</script>

<style scoped>
.cr-anuncie-container {
	font-family: 'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif;
	background: linear-gradient(120deg, #f6f7fb 0%, #fbeede 100%);
	min-height: 100vh;
}
.cr-main {
	padding: 0 5vw;
	max-width: 1280px;
	margin: 0 auto;
}
.cr-stats {
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: linear-gradient(90deg, #fff6e9 0%, #fbeede 100%);
	padding: 48px 0 32px 0;
	margin-bottom: 0;
	border-radius: 32px 32px 0 0;
	box-shadow: 0 4px 16px rgba(255,106,61,0.06);
}
.cr-stats-top {
	margin-top: 0;
	margin-bottom: 56px;
	border-radius: 0 0 32px 32px;
	box-shadow: 0 8px 32px rgba(255,106,61,0.08);
}
.cr-hero {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 0;
	gap: 0;
}
.cr-hero-compact {
	min-height: 340px;
}
.cr-hero-card {
	display: flex;
	align-items: center;
	background: #fff;
	border-radius: 36px;
	box-shadow: 0 12px 48px rgba(40, 60, 90, 0.10);
	padding: 38px 64px;
	border: 1.5px solid #eaeaea;
	animation: fadeInUp 1s cubic-bezier(.23,1,.32,1);
	gap: 48px;
	max-width: 1320px;
	width: 100%;
}
.cr-hero-content {
	max-width: 420px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.cr-hero-content h1 {
	font-size: 2.6rem;
	font-weight: 900;
	color: #222;
	margin-bottom: 32px;
	line-height: 1.08;
	letter-spacing: -2px;
	text-shadow: 0 2px 12px #f2994a22;
	font-family: 'Montserrat', 'Inter', Arial, sans-serif;
}
.cr-hero-img {
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fff;
	border-radius: 36px;
	box-shadow: 0 12px 48px rgba(40, 60, 90, 0.10);
	padding: 48px;
	min-width: 420px;
	max-width: 540px;
	border: 1.5px solid #eaeaea;
	animation: fadeInUp 1.2s cubic-bezier(.23,1,.32,1);
}
.cr-hero-img img {
	width: 100%;
	max-width: 460px;
	border-radius: 28px;
	object-fit: cover;
	box-shadow: 0 8px 32px rgba(255,106,61,0.13);
	background: #fff;
	display: block;
	border: 2px solid #ffb34744;
}
.cr-list {
	list-style: none;
	padding: 0;
	margin-bottom: 40px;
}
.cr-list li {
	font-size: 1.25rem;
	color: #444;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
	gap: 12px;
	font-weight: 600;
	letter-spacing: 0.2px;
	font-family: 'Inter', Arial, sans-serif;
}
.cr-btn-group {
	display: flex;
	gap: 0;
	margin-bottom: 28px;
	justify-content: flex-start;
}
.cr-btn-main {
	background: linear-gradient(90deg, #ff6a3d 0%, #ffb347 100%);
	color: #fff;
	border-radius: 50px;
	font-size: 1.35rem;
	font-weight: 900;
	padding: 22px 64px;
	border: none;
	box-shadow: 0 8px 32px rgba(255,106,61,0.13);
	cursor: pointer;
	transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
	outline: none;
	letter-spacing: 0.5px;
	font-family: 'Montserrat', 'Inter', Arial, sans-serif;
	position: relative;
	overflow: hidden;
}
.cr-btn-main::after {
	content: '';
	position: absolute;
	left: 0; top: 0; right: 0; bottom: 0;
	background: linear-gradient(120deg, #ffb34744 0%, #ff6a3d22 100%);
	opacity: 0;
	transition: opacity 0.3s;
	border-radius: 50px;
}
.cr-btn-main:hover {
	background: linear-gradient(90deg, #ff6a3d 0%, #ffb347 100%);
	box-shadow: 0 16px 48px rgba(255,106,61,0.22);
	transform: translateY(-2px) scale(1.05);
}
.cr-btn-main:hover::after {
	opacity: 0.18;
}
.cr-note {
	color: #888;
	font-size: 1.12rem;
	margin-top: 12px;
	font-style: italic;
}
.cr-stat {
	text-align: center;
	min-width: 180px;
	background: #fff;
	border-radius: 28px;
	box-shadow: 0 4px 24px rgba(255,106,61,0.07);
	padding: 40px 24px 32px 24px;
	margin: 0 16px;
	border: 1.5px solid #ffb34722;
	animation: fadeInUp 1.4s cubic-bezier(.23,1,.32,1);
}
.cr-stat-num {
	font-size: 3rem;
	font-weight: 900;
	color: #ff6a3d;
	display: block;
	margin-bottom: 16px;
	letter-spacing: -1px;
	text-shadow: 0 2px 12px #ffb34722;
	font-family: 'Montserrat', 'Inter', Arial, sans-serif;
}
.cr-stat-label {
	font-size: 1.22rem;
	color: #444;
	font-weight: 700;
	letter-spacing: 0.2px;
	font-family: 'Inter', Arial, sans-serif;
}
.side-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0,0,0,0.18);
	z-index: 1000;
	display: flex;
	justify-content: flex-end;
	align-items: stretch;
}
.side-modal {
	background: #fff;
	width: 700px;
	max-width: 100vw;
	height: 100vh;
	box-shadow: -2px 0 32px rgba(0,0,0,0.10);
	padding: 48px 40px 32px 40px;
	display: flex;
	flex-direction: column;
	position: relative;
	animation: slideInRight 0.4s cubic-bezier(.23,1,.32,1);
}
@keyframes slideInRight {
	0% { transform: translateX(100%); opacity: 0; }
	100% { transform: translateX(0); opacity: 1; }
}
.side-modal-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 32px;
}
.side-modal-header h2 {
	font-size: 1.6rem;
	font-weight: 700;
	color: #222;
	margin: 0;
	max-width: 80%;
	line-height: 1.2;
}
.side-modal-close {
	background: none;
	border: none;
	padding: 0;
	margin-left: 16px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 0.2s;
	border-radius: 50%;
	width: 36px;
	height: 36px;
}
.side-modal-close:hover {
	background: #f6f6f6;
}
.side-modal-close svg {
	display: block;
}
.side-modal-form {
	display: flex;
	flex-direction: column;
	gap: 22px;
}
.side-modal-form label {
	font-size: 1.08rem;
	font-weight: 500;
	color: #222;
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.side-modal-form input {
	padding: 14px 16px;
	border-radius: 10px;
	border: 1.5px solid #eaeaea;
	font-size: 1.08rem;
	background: #fafbfc;
	margin-top: 2px;
	outline: none;
	transition: border 0.2s;
}
.side-modal-form input:focus {
	border-color: #ff6a3d;
}
.side-modal-priv {
	font-size: 0.98rem;
	color: #666;
	margin-top: 8px;
	margin-bottom: 12px;
	line-height: 1.4;
}
.side-modal-submit {
	background: #eaeaea;
	color: #aaa;
	border: none;
	border-radius: 10px;
	padding: 14px 0;
	font-size: 1.12rem;
	font-weight: 700;
	cursor: not-allowed;
	margin-top: 12px;
	transition: background 0.2s, color 0.2s;
}
.side-modal-submit:enabled {
	background: linear-gradient(90deg, #ff6a3d 0%, #ffb347 100%);
	color: #fff;
	cursor: pointer;
}
.input-error {
	border-color: #e2001a !important;
	background: #fff6f6 !important;
}
.input-error-msg {
	color: #e2001a;
	font-size: 0.98rem;
	margin-top: 2px;
	margin-bottom: 2px;
	font-weight: 500;
	display: block;
}
@media (max-width: 900px) {
	.cr-hero {
		flex-direction: column;
		gap: 40px;
	}
	.cr-main {
		padding: 0 2vw;
	}
	.cr-hero-img {
		min-width: unset;
		max-width: 100%;
		padding: 24px;
	}
	.cr-hero-text {
		padding: 40px 16px 28px 16px;
	}
	.cr-stats {
		flex-direction: column;
		gap: 32px;
		padding: 40px 0 24px 0;
		border-radius: 0 0 28px 28px;
	}
	.cr-stat {
		margin: 16px 0;
		padding: 28px 8px 18px 8px;
	}
}
@keyframes fadeInUp {
	0% { opacity: 0; transform: translateY(40px); }
	100% { opacity: 1; transform: translateY(0); }
}
.side-modal-step2 {
	display: flex;
	flex-direction: column;
	gap: 32px;
	margin-top: 32px;
}
.side-modal-options {
	display: flex;
	flex-direction: column;
	gap: 24px;
}
.side-modal-option {
	background: #fafbfc;
	border: 1.5px solid #eaeaea;
	border-radius: 10px;
	padding: 18px 16px;
	font-size: 1.12rem;
	font-weight: 500;
	color: #222;
	cursor: pointer;
	transition: border 0.2s, background 0.2s;
	text-align: left;
}
.side-modal-option.selected {
	border-color: #ff6a3d;
	background: #fff6e9;
}
.side-modal-actions {
	display: flex;
	gap: 24px;
	margin-top: 24px;
}
.side-modal-back {
	background: #fff;
	color: #222;
	border: 1.5px solid #eaeaea;
	border-radius: 10px;
	padding: 12px 32px;
	font-size: 1.08rem;
	font-weight: 600;
	cursor: pointer;
	transition: border 0.2s;
}
.side-modal-back:hover {
	border-color: #ff6a3d;
}
</style>
