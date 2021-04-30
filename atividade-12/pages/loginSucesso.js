module.exports = user => `<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
			crossorigin="anonymous"
		/>
		<title>Document</title>
	</head>
	<body
		style="
			background-color: rgb(160, 207, 196);
			font-family: 'Roboto', sans-serif;
		"
	>
		<header
			class="fixed-top d-flex justify-content-end align-items-center"
			style="
				background-color: rgb(255, 255, 255);
				box-shadow: 0 0 15px 0 #000;
			"
		>
			<div class="position-absolute top-50 start-50 translate-middle">
				<h1 class="text-center my-3">Empresa</h1>
			</div>

			<p class="m-0 my-3 me-5 fs-3">Bem-Vindo: ${user}</p>
		</header>

		<div class="container text-center py-5" style="margin-top: 68px">
			<h2>Logado com sucesso</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
				numquam quos unde mollitia accusantium illum quasi eligendi
				aliquid molestias! Aliquid delectus maxime laboriosam! Sint,
				dolores itaque corrupti laudantium explicabo earum!
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Aliquid ipsa blanditiis repudiandae minus rem enim est sunt
				accusantium fugiat nisi itaque corrupti similique quod, tempora,
				minima a. Mollitia, quis laudantium.
			</p>
			<a href="/">
				<button class="btn btn-outline-dark">Home</button>
			</a>
		</div>
		<img
			src="https://imgs.jusbr.com/publications/images/a345f087d3ee225441b329403b24179a"
			class="img-fluid"
		/>

		<script
			src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"
			integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG"
			crossorigin="anonymous"
		></script>
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"
			integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc"
			crossorigin="anonymous"
		></script>
	</body>
</html>
`
