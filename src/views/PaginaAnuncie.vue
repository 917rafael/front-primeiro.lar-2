<script>
import FooterComponent from '@/components/Footer.vue';
import HeaderVenda from '@/components/HeaderVenda.vue';

export default {
	components: {
    FooterComponent,
    HeaderVenda
  },
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
			tipoImovel: '',
			subTipoImovel: '',
			valor: '',
			outrasInformacoes: '',
			cep: '',
			endereco: '',
			cidade: '',
			estado: '',
			numero: '',
			camposEnderecoReadonly: false,
			opcoesResidencial: [
				'Apartamento',
				'Apartamento Garden',
				'Cobertura',
				'Casa',
				'Casa de Condomínio',
				'Casa de Vila',
				'Sobrado',
				'Terreno',
				'Sítio',
				'Chácara',
				'Fazenda',
				'Pousada',
				'Prédio Inteiro',
				'Studio'
			],
			opcoesComercial: [
				'Sala Comercial',
				'Loja',
				'Galpão',
				'Prédio Comercial',
				'Terreno Comercial',
				'Hotel',
				'Ponto Comercial',
				'Box/Garagem',
				'Consultório',
				'Escritório',
				'Indústria',
				'Depósito/Armazém'
			],
			quantidadeQuartos: '',
			quantidadeBanheiros: '',
			metrosQuadrados: ''
		};
	},
	methods: {
		validateEmail() {
			this.emailError = !this.form.email.includes('@') || this.form.email.length < 5;
		},
		handleTelefoneKeydown(event) {
			const input = event.target;
			const cursorPosition = input.selectionStart;
			const value = input.value;
			
			if (event.key === 'Backspace') {
				if (cursorPosition > 0) {
					const charBefore = value[cursorPosition - 1];
					if (charBefore === '-' || charBefore === ')') {
						event.preventDefault();
						let newValue;
						if (charBefore === '-') {
							newValue = value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
						} else if (charBefore === ')') {
							newValue = value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
						}
						
						const numbersOnly = newValue.replace(/\D/g, '');
						this.form.telefone = numbersOnly;
						this.formatTelefone();
						
						this.$nextTick(() => {
							const newCursorPos = Math.max(0, cursorPosition - 2);
							input.setSelectionRange(newCursorPos, newCursorPos);
						});
						return;
					}
				}
			}
			else if (event.key === 'Delete') {
				if (cursorPosition < value.length) {
					const charAfter = value[cursorPosition];
					if (charAfter === '-' || charAfter === '(' || charAfter === ')') {
						event.preventDefault();
						let newValue;
						if (charAfter === '(' || charAfter === ')') {
							newValue = value.slice(0, cursorPosition) + value.slice(cursorPosition + 2);
						} else {
							newValue = value.slice(0, cursorPosition) + value.slice(cursorPosition + 2);
						}
						
			
						const numbersOnly = newValue.replace(/\D/g, '');
						this.form.telefone = numbersOnly;
						this.formatTelefone();
						
						this.$nextTick(() => {
							input.setSelectionRange(cursorPosition, cursorPosition);
						});
						return;
					}
				}
			}
			
			const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
			
			if (allowedKeys.includes(event.key)) {
				return;
			}
			
			if (!/^\d$/.test(event.key)) {
				event.preventDefault();
			}
		},
		formatTelefone() {
			let val = this.form.telefone.replace(/\D/g, '');
			
			if (val.length > 11) {
				val = val.slice(0, 11);
			}
			
			if (val.length >= 2) {
				val = `(${val.slice(0, 2)})${val.slice(2)}`;
			}
			
			if (val.length >= 9) {
				val = val.replace(/(\(\d{2}\))(\d{5})/, '$1$2-');
			}
			
			this.form.telefone = val;
			
			const numeros = val.replace(/\D/g, '');
			this.telefoneError = numeros.length < 10 || numeros.length > 11;
		},
		nextStep(e) {
			if (!this.form.nome || this.emailError || this.telefoneError) return;
			this.modalStep = 2;
			if (e) e.preventDefault();
		},
		selecionarTipoImovel(tipo) {
			this.tipoImovel = tipo;
			this.subTipoImovel = '';
		},
		proximaEtapa() {
			if (this.modalStep === 2 && this.tipoImovel && this.subTipoImovel) {
				this.modalStep = 3;
			} else if (this.modalStep === 3 && this.valor.trim()) {
				this.modalStep = 4;
			} else if (this.modalStep === 4 && this.cep.trim() && this.endereco.trim() && this.numero.trim()) {
				this.modalStep = 5; 
			}
		},
		voltarEtapa() {
			if (this.modalStep === 5) {
				this.modalStep = 4;
			} else if (this.modalStep === 4) {
				this.modalStep = 3;
			} else if (this.modalStep === 3) {
				this.modalStep = 2;
			} else if (this.modalStep === 2) {
				this.modalStep = 1;
				this.tipoImovel = '';
				this.subTipoImovel = '';
			}
		},
		formatValor() {
			// Remove tudo que não for número
			let valor = this.valor.replace(/\D/g, '');
			
			// Converte para formato de moeda
			if (valor) {
				valor = parseFloat(valor) / 100;
				this.valor = valor.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				});
			} else {
				this.valor = '';
			}
		},
		formatCep() {
			let cep = this.cep.replace(/\D/g, '');
			
			if (cep.length > 8) {
				cep = cep.slice(0, 8);
			}
			
			if (cep.length > 5) {
				cep = cep.replace(/(\d{5})(\d{1,3})/, '$1-$2');
			}
			
			this.cep = cep;
		},
		async buscarCep() {
			if (this.cep.length !== 9) {
				alert('Por favor, digite um CEP válido com 8 números.');
				return;
			}

			try {
				const cepLimpo = this.cep.replace(/\D/g, '');
				
				const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
				
				if (!response.ok) {
					throw new Error('Erro na consulta do CEP');
				}
				
				const data = await response.json();
				
				if (!data.erro) {
					this.endereco = data.logradouro || '';
					this.cidade = data.localidade || '';
					this.estado = data.uf || '';
					
					this.camposEnderecoReadonly = true;
					
					console.log('CEP encontrado:', {
						cep: this.cep,
						endereco: this.endereco,
						cidade: this.cidade,
						estado: this.estado,
						bairro: data.bairro || ''
					});
				} else {
					alert('CEP não encontrado. Verifique o número digitado.');
					this.endereco = '';
					this.cidade = '';
					this.estado = '';
				}
			} catch (error) {
				console.error('Erro ao buscar CEP:', error);
				alert('Erro ao consultar CEP. Tente novamente.');
				this.endereco = '';
				this.cidade = '';
				this.estado = '';
			}
		},
		finalizarCadastro() {
			if (!this.quantidadeQuartos || !this.quantidadeBanheiros || !this.metrosQuadrados) return;

			console.log('Dados do formulário:', {
				nome: this.form.nome,
				email: this.form.email,
				telefone: this.form.telefone,
				tipoImovel: this.tipoImovel,
				subTipoImovel: this.subTipoImovel,
				valor: this.valor,
				outrasInformacoes: this.outrasInformacoes,
				cep: this.cep,
				endereco: this.endereco,
				cidade: this.cidade,
				estado: this.estado,
				numero: this.numero,
				quantidadeQuartos: this.quantidadeQuartos,
				quantidadeBanheiros: this.quantidadeBanheiros,
				metrosQuadrados: this.metrosQuadrados
			});
			
			this.modalStep = 6; 
		},
		fecharModal() {
			this.showModal = false;
			this.form = { nome: '', email: '', telefone: '' };
			this.tipoImovel = '';
			this.subTipoImovel = '';
			this.valor = '';
			this.outrasInformacoes = '';
			this.cep = '';
			this.endereco = '';
			this.cidade = '';
			this.estado = '';
			this.numero = '';
			this.camposEnderecoReadonly = false;
			this.modalStep = 1;
		},
		verMaisImoveis() {
			this.fecharModal();
			this.$router.push('/vendas');
		}
	}
};
</script>

<template>
	<HeaderVenda />
	<div class="cr-anuncie-container">
		<main class="cr-main">
			<section class="cr-hero cr-hero-compact">
				<div class="cr-hero-card">
					<div class="cr-hero-content">
						<h1>
							Anuncie seu imóvel<br />
							na Primeiro Lar!<br />
							É rápido e grátis.
						</h1>
						<ul class="cr-list">
							<li>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12" cy="12" r="10" fill="#10B981"/>
									<path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								Cadastramento 100% online.
							</li>
							<li>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12" cy="12" r="10" fill="#10B981"/>
									<path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								Seu imóvel anunciado em até 2h.*
							</li>
							<li>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12" cy="12" r="10" fill="#10B981"/>
									<path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
								Atendimento personalizado para seu imóvel.
							</li>
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
					<h2 v-else-if="modalStep === 3">Precisamos de mais informações sobre o seu imóvel</h2>
					<h2 v-else-if="modalStep === 4">Qual o endereço completo do imóvel?</h2>
					<h2 v-else-if="modalStep === 5">Detalhes adicionais do imóvel</h2>
					<h2 v-else-if="modalStep === 6">Anúncio de venda de imóvel criado!</h2>
					   <button v-if="modalStep !== 6" class="side-modal-close" @click="showModal = false" aria-label="Fechar">
						   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							   <path d="M6 6L18 18" stroke="#222" stroke-width="2" stroke-linecap="round"/>
							   <path d="M18 6L6 18" stroke="#222" stroke-width="2" stroke-linecap="round"/>
						   </svg>
					   </button>
				</div>
			
				<form v-if="modalStep === 1" class="side-modal-form" @submit.prevent>
					<label>Nome
						<input type="text" v-model="form.nome" placeholder="Seu Nome" />
					</label>
					<label>E-mail
						<input type="email" v-model="form.email" placeholder="Seu e-mail" @blur="validateEmail" :class="{'input-error': emailError}" />
						<span v-if="emailError" class="input-error-msg">Informe um e-mail válido.</span>
					</label>
					<label>Telefone
						<input type="tel" v-model="form.telefone" placeholder="Seu telefone" 
							@input="formatTelefone" 
							@keydown="handleTelefoneKeydown" 
							maxlength="15" 
							:class="{'input-error': telefoneError}" />
						<span v-if="telefoneError" class="input-error-msg">Informe um telefone válido. Ex: (99) 99999-9999</span>
					</label>
					<p class="side-modal-priv">
						Ao enviar mensagem você concorda em compartilhar seus dados de acordo com a Política de Privacidade da Primeiro Lar, disponível para acesso, além de estar ciente e concordar em receber todas as comunicações relativas ao seu cadastro.
					</p>
					<button class="side-modal-submit" :disabled="!form.nome || emailError || telefoneError" @click="nextStep">Continuar</button>
				</form>
				<!-- Etapa 2: Escolha do tipo de imóvel -->
				<div v-else-if="modalStep === 2" class="side-modal-step2">
					<div class="side-modal-options">
						<button type="button" class="side-modal-option" :class="{'selected': tipoImovel === 'residencial'}" @click="selecionarTipoImovel('residencial')">Imóvel residencial</button>
						<button type="button" class="side-modal-option" :class="{'selected': tipoImovel === 'comercial'}" @click="selecionarTipoImovel('comercial')">Imóvel comercial</button>
					</div>
					
					<!-- Dropdown com opções específicas -->
					<div v-if="tipoImovel" class="side-modal-dropdown">
						<label>Selecione o tipo de imóvel</label>
						<select v-model="subTipoImovel" class="side-modal-select">
							<option value="">Selecione o tipo de imóvel</option>
							<option 
								v-for="opcao in (tipoImovel === 'residencial' ? opcoesResidencial : opcoesComercial)" 
								:key="opcao" 
								:value="opcao">
								{{opcao}}
							</option>
						</select>
					</div>
					
					<div class="side-modal-actions">
						<button class="side-modal-back" @click="voltarEtapa">Voltar</button>
						<button class="side-modal-submit" :disabled="!tipoImovel || !subTipoImovel" @click="proximaEtapa">Continuar</button>
					</div>
				</div>
				
				<!-- Etapa 3: Informações do imóvel -->
				<div v-else-if="modalStep === 3" class="side-modal-step3">
					<div class="side-modal-form-group">
						<label>Valor</label>
						<input 
							type="text" 
							v-model="valor" 
							placeholder="R$ 0,00" 
							@input="formatValor"
							class="side-modal-input" 
						/>
					</div>
					
					<div class="side-modal-form-group">
						<label>Outras informações</label>
						<textarea 
							v-model="outrasInformacoes" 
							placeholder="Mais detalhes que considera relevante sobre o imóvel"
							class="side-modal-textarea"
							rows="4"
						></textarea>
					</div>
					
					<div class="side-modal-actions">
						<button class="side-modal-back" @click="voltarEtapa">Voltar</button>
						<button class="side-modal-submit" :disabled="!valor.trim()" @click="proximaEtapa">Continuar</button>
					</div>
				</div>
				
				<!-- Etapa 4: Endereço do imóvel -->
				<div v-else-if="modalStep === 4" class="side-modal-step4">
					<div class="side-modal-form-group">
						<label>CEP</label>
						<div class="cep-input-container">
							<input 
								type="text" 
								v-model="cep" 
								placeholder="00000-000"
								@input="formatCep"
								maxlength="9"
								class="side-modal-input cep-input" 
							/>
							<button 
								type="button" 
								class="buscar-cep-btn" 
								@click="buscarCep"
								:disabled="cep.length !== 9"
							>
								Buscar
							</button>
						</div>
					</div>
					
					<div class="side-modal-form-group">
						<label>Endereço</label>
						<input 
							type="text" 
							v-model="endereco" 
							placeholder="Qual o endereço do imóvel?"
							class="side-modal-input" 
						/>
					</div>
					
					<div class="side-modal-form-row">
						<div class="side-modal-form-group">
							<label>Cidade</label>
							<input 
								type="text" 
								v-model="cidade" 
								placeholder="Cidade"
								class="side-modal-input" 
								:readonly="camposEnderecoReadonly"
							/>
						</div>
						<div class="side-modal-form-group">
							<label>Estado</label>
							<input 
								type="text" 
								v-model="estado" 
								placeholder="UF"
								class="side-modal-input" 
								:readonly="camposEnderecoReadonly"
								maxlength="2"
							/>
						</div>
					</div>
					
					<div class="side-modal-form-row">
						<div class="side-modal-form-group">
							<label>Número</label>
							<input 
								type="text" 
								v-model="numero" 
								placeholder="Qual o número do imóvel?"
								class="side-modal-input" 
							/>
						</div>
					</div>
					
					<div class="side-modal-actions">
						<button class="side-modal-back" @click="voltarEtapa">Voltar</button>
						<button class="side-modal-submit" :disabled="!cep.trim() || !endereco.trim() || !numero.trim()" @click="proximaEtapa">Continuar</button>
					</div>
				</div>

				<!-- Etapa 5: Detalhes adicionais do imóvel -->
				<div v-else-if="modalStep === 5" class="side-modal-step5">
					<div class="side-modal-form-group">
						<label>Quantidade de Quartos</label>
						<input 
							type="number" 
							v-model="quantidadeQuartos" 
							placeholder="Ex: 3"
							class="side-modal-input" 
						/>
					</div>

					<div class="side-modal-form-group">
						<label>Quantidade de Banheiros</label>
						<input 
							type="number" 
							v-model="quantidadeBanheiros" 
							placeholder="Ex: 2"
							class="side-modal-input" 
						/>
					</div>

					<div class="side-modal-form-group">
						<label>Metros Quadrados</label>
						<input 
							type="number" 
							v-model="metrosQuadrados" 
							placeholder="Ex: 120"
							class="side-modal-input" 
						/>
					</div>

					<div class="side-modal-actions">
						<button class="side-modal-back" @click="voltarEtapa">Voltar</button>
						<button class="side-modal-submit" :disabled="!quantidadeQuartos || !quantidadeBanheiros || !metrosQuadrados" @click="finalizarCadastro">Continuar</button>
					</div>
				</div>
				
				<!-- Etapa 6: Tela de sucesso -->
				<div v-else-if="modalStep === 6" class="side-modal-success">
					<div class="success-content">
						<div class="success-icon">
							<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="12" cy="12" r="10" fill="#10B981"/>
								<path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						
						<h3>Seu anúncio foi criado com sucesso!</h3>
						
						<p>Parabéns! Seu anúncio de imóvel foi <strong>publicado</strong> com sucesso.</p>
						
						<p>Seu imóvel já está disponível no site da Primeiro Lar e nossa equipe entrará em contato em breve para auxiliar no processo de venda.</p>
						
						<p class="success-note">Esta confirmação permanecerá visível para seu controle. Use o botão abaixo quando desejar continuar navegando.</p>
						
						<button class="success-testimonials-btn" @click="verMaisImoveis">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 2L3 7L12 12L21 7L12 2Z" fill="white"/>
								<path d="M3 17L12 22L21 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M3 12L12 17L21 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							Veja mais imóveis
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
    <FooterComponent />
</template>

<style scoped>
.cr-anuncie-container {
	font-family: 'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif;
	background: linear-gradient(120deg, #f6f7fb 0%, #fbeede 100%);
	min-height: 100vh;
	padding-top: 80px;
}
.cr-main {
	padding: 0 5vw;
	max-width: 1400px;
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
	z-index: 9999;
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
	background: #ccc;
	color: #888;
	border: none;
	border-radius: 25px;
	padding: 12px 32px;
	font-size: 1.08rem;
	font-weight: 600;
	cursor: not-allowed;
	transition: all 0.3s ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.side-modal-submit:enabled {
	background: linear-gradient(90deg, #ff6a3d 0%, #ffb347 100%);
	color: #fff;
	cursor: pointer;
	box-shadow: 0 4px 16px rgba(255, 106, 61, 0.3);
}
.side-modal-submit:enabled:hover {
	transform: translateY(-1px);
	box-shadow: 0 6px 20px rgba(255, 106, 61, 0.4);
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
	background: #ffffff;
	border: 2px solid #e5e7eb;
	border-radius: 12px;
	padding: 20px 24px;
	font-size: 1.1rem;
	font-weight: 600;
	color: #374151;
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: left;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	position: relative;
	overflow: hidden;
}
.side-modal-option:hover {
	border-color: #ff6a3d;
	background: #fef7f0;
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(255, 106, 61, 0.15);
}
.side-modal-option.selected {
	border-color: #ff6a3d;
	background: linear-gradient(135deg, #fff6e9 0%, #fef7f0 100%);
	color: #ff6a3d;
	box-shadow: 0 4px 16px rgba(255, 106, 61, 0.2);
}
.side-modal-option.selected::before {
	content: '✓';
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	font-weight: bold;
	font-size: 1.2rem;
	color: #ff6a3d;
}
.side-modal-actions {
	display: flex;
	justify-content: space-between;
	gap: 24px;
	margin-top: 24px;
}
.side-modal-back {
	background: transparent;
	color: #666;
	border: none;
	padding: 12px 0;
	font-size: 1.08rem;
	font-weight: 600;
	cursor: pointer;
	transition: color 0.2s ease;
}
.side-modal-back:hover {
	color: #ff6a3d;
}
.side-modal-dropdown {
	margin-top: 24px;
}
.side-modal-dropdown label {
	display: block;
	font-size: 1.08rem;
	font-weight: 600;
	color: #222;
	margin-bottom: 12px;
}
.side-modal-select {
	width: 100%;
	background: #ffffff;
	border: 2px solid #e5e7eb;
	border-radius: 10px;
	padding: 16px 12px;
	font-size: 1.08rem;
	color: #374151;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.side-modal-select:focus {
	outline: none;
	border-color: #ff6a3d;
	background: #ffffff;
	box-shadow: 0 0 0 3px rgba(255, 106, 61, 0.1);
}
.side-modal-select:hover {
	border-color: #9ca3af;
}
.side-modal-select option {
	padding: 8px 12px;
	font-size: 1.08rem;
	color: #374151;
}
/* Estilos para etapa 3 */
.side-modal-step3 {
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin-top: 32px;
}
.side-modal-form-group {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.side-modal-form-group label {
	font-size: 1.1rem;
	font-weight: 600;
	color: #374151;
}
.side-modal-input {
	width: 100%;
	background: #ffffff;
	border: 2px solid #e5e7eb;
	border-radius: 10px;
	padding: 16px 12px;
	font-size: 1.08rem;
	color: #374151;
	transition: all 0.3s ease;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.side-modal-input:focus {
	outline: none;
	border-color: #ff6a3d;
	box-shadow: 0 0 0 3px rgba(255, 106, 61, 0.1);
}
.side-modal-input[readonly] {
	background: #f8f9fa;
	color: #6c757d;
	cursor: not-allowed;
}
.side-modal-input[readonly]:focus {
	border-color: #e5e7eb;
	box-shadow: none;
}
.side-modal-textarea {
	width: 100%;
	background: #ffffff;
	border: 2px solid #e5e7eb;
	border-radius: 10px;
	padding: 16px 12px;
	font-size: 1.08rem;
	color: #374151;
	transition: all 0.3s ease;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	resize: vertical;
	min-height: 100px;
	font-family: inherit;
}
.side-modal-textarea:focus {
	outline: none;
	border-color: #ff6a3d;
	box-shadow: 0 0 0 3px rgba(255, 106, 61, 0.1);
}
.side-modal-textarea::placeholder {
	color: #9ca3af;
}
/* Estilos para etapa 4 */
.side-modal-step4 {
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin-top: 32px;
}
.cep-input-container {
	position: relative;
	display: flex;
	align-items: center;
	gap: 12px;
	flex-wrap: wrap;
}
.cep-input {
	flex: 1;
	min-width: 150px;
}
.buscar-cep-btn {
	background: linear-gradient(90deg, #ff6a3d 0%, #ffb347 100%);
	color: white;
	border: none;
	border-radius: 8px;
	padding: 12px 20px;
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	white-space: nowrap;
	box-shadow: 0 2px 8px rgba(255, 106, 61, 0.2);
}
.buscar-cep-btn:hover:not(:disabled) {
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(255, 106, 61, 0.3);
}
.buscar-cep-btn:disabled {
	background: #ccc;
	cursor: not-allowed;
	box-shadow: none;
}
.side-modal-form-row {
	display: flex;
	gap: 16px;
}
.side-modal-form-row .side-modal-form-group {
	flex: 1;
}
.side-modal-form-row .side-modal-form-group:first-child {
	flex: 0.4;
}
.side-modal-form-row .side-modal-form-group:last-child {
	flex: 0.6;
}
/* Estilos para tela de sucesso - Design sofisticado */
.side-modal-success {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 0;
	padding: 40px 20px;
	background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
	border-radius: 20px;
	position: relative;
	overflow: hidden;
}

.side-modal-success::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 4px;
	background: linear-gradient(90deg, #10B981 0%, #059669 50%, #047857 100%);
}

.success-content {
	text-align: center;
	max-width: 450px;
	position: relative;
	z-index: 2;
}

.success-icon {
  margin: 0 auto; /* Center horizontally */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.success-icon::before {
	content: '';
	position: absolute;
	width: 120px;
	height: 120px;
	background: linear-gradient(135deg, #10B981 0%, #059669 100%);
	border-radius: 50%;
	opacity: 0.1;
	animation: pulse 2s infinite;
}

.success-icon svg {
	position: relative;
	z-index: 2;
	width: 80px;
	height: 80px;
	filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3));
}

.success-content h3 {
	font-size: 2rem;
	font-weight: 800;
	background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	margin-bottom: 24px;
	line-height: 1.2;
	letter-spacing: -0.5px;
	font-family: 'Montserrat', 'Inter', sans-serif;
}

.success-content p {
	font-size: 1.15rem;
	color: #64748b;
	line-height: 1.7;
	margin-bottom: 20px;
	font-weight: 400;
}

.success-content p strong {
	background: linear-gradient(135deg, #10B981 0%, #059669 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	font-weight: 700;
}

.success-note {
	font-size: 0.9rem !important;
	color: #94a3b8 !important;
	font-style: italic;
	margin-top: 24px !important;
	padding: 16px;
	background: rgba(148, 163, 184, 0.05);
	border-radius: 12px;
	border-left: 3px solid #e2e8f0;
}

.success-testimonials-btn {
  margin: 0 auto; /* Center horizontally */
  display: flex;
  justify-content: center;
  align-items: center;
	background: linear-gradient(135deg, #ff6a3d 0%, #ff8c42 50%, #ffb347 100%);
	color: white;
	border: none;
	border-radius: 50px;
	padding: 18px 32px;
	font-size: 1.1rem;
	font-weight: 700;
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	box-shadow: 0 8px 25px rgba(255, 106, 61, 0.3);
	align-items: center;
	gap: 12px;
	position: relative;
	overflow: hidden;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	font-family: 'Montserrat', 'Inter', sans-serif;
}

.success-testimonials-btn::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
	transition: left 0.6s;
}

.success-testimonials-btn:hover::before {
	left: 100%;
}

.success-testimonials-btn:hover {
	transform: translateY(-3px) scale(1.02);
	box-shadow: 0 15px 35px rgba(255, 106, 61, 0.4);
}

.success-testimonials-btn:active {
	transform: translateY(-1px) scale(0.98);
}

@keyframes pulse {
	0%, 100% {
		transform: scale(1);
		opacity: 0.1;
	}
	50% {
		transform: scale(1.1);
		opacity: 0.2;
	}
}
/* Melhorar estilos dos ícones na lista */
.cr-list li {
	display: flex;
	align-items: center;
	gap: 12px;
}
.cr-list li svg {
	flex-shrink: 0;
}
</style>
