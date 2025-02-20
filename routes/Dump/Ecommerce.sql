PGDMP  5                    }         	   ecommerce #   16.6 (Ubuntu 16.6-0ubuntu0.24.04.1) #   16.6 (Ubuntu 16.6-0ubuntu0.24.04.1) 0    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16464 	   ecommerce    DATABASE     u   CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE ecommerce;
                postgres    false            �            1255    16673    update_updated_at_column()    FUNCTION     �   CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.update_updated_at_column();
       public          postgres    false            �            1255    16676    update_users_updated_at()    FUNCTION     �   CREATE FUNCTION public.update_users_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;
 0   DROP FUNCTION public.update_users_updated_at();
       public          postgres    false            �            1259    16549    cart    TABLE     O  CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT cart_quantity_check CHECK ((quantity > 0))
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    16548    cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cart_id_seq;
       public          postgres    false    221            �           0    0    cart_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;
          public          postgres    false    220            �            1259    16515 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    16514    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    217            �           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    216            �            1259    16636    order_items_id_seq    SEQUENCE     {   CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.order_items_id_seq;
       public          postgres    false            �            1259    16655    order_items    TABLE     �  CREATE TABLE public.order_items (
    id integer DEFAULT nextval('public.order_items_id_seq'::regclass) NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.order_items;
       public         heap    postgres    false    224            �            1259    16623    orders_id_seq    SEQUENCE     v   CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false            �            1259    16624    orders    TABLE     �  CREATE TABLE public.orders (
    id integer DEFAULT nextval('public.orders_id_seq'::regclass) NOT NULL,
    user_id integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.orders;
       public         heap    postgres    false    222            �            1259    16534    products    TABLE     "  CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price double precision NOT NULL,
    stock integer NOT NULL,
    category_id integer,
    image_url text,
    CONSTRAINT products_stock_check CHECK ((stock >= 0))
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16533    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    219            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    218            �            1259    16468    users    TABLE     '  CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) DEFAULT 'customer'::character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'customer'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �           2604    16552    cart id    DEFAULT     b   ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);
 6   ALTER TABLE public.cart ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    16518    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    16537    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �          0    16549    cart 
   TABLE DATA           Y   COPY public.cart (id, user_id, product_id, quantity, created_at, updated_at) FROM stdin;
    public          postgres    false    221   s;       �          0    16515 
   categories 
   TABLE DATA           U   COPY public.categories (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �;       �          0    16655    order_items 
   TABLE DATA           h   COPY public.order_items (id, order_id, product_id, quantity, price, created_at, updated_at) FROM stdin;
    public          postgres    false    225   �;       �          0    16624    orders 
   TABLE DATA           Z   COPY public.orders (id, user_id, total_price, status, created_at, updated_at) FROM stdin;
    public          postgres    false    223   k<       �          0    16534    products 
   TABLE DATA           _   COPY public.products (id, name, description, price, stock, category_id, image_url) FROM stdin;
    public          postgres    false    219   �<       �          0    16468    users 
   TABLE DATA           c   COPY public.users (id, username, email, password_hash, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �=       �           0    0    cart_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.cart_id_seq', 6, true);
          public          postgres    false    220            �           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 2, true);
          public          postgres    false    216            �           0    0    order_items_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.order_items_id_seq', 4, true);
          public          postgres    false    224            �           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 2, true);
          public          postgres    false    222            �           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 4, true);
          public          postgres    false    218                       2606    16556    cart cart_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    221                       2606    16526    categories categories_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_name_key;
       public            postgres    false    217            	           2606    16524    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    217                       2606    16662    order_items order_items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public            postgres    false    225                       2606    16632    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    223                       2606    16542    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    219                       2606    16481    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215                       2606    16479    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215                       2620    16675 )   order_items update_order_items_updated_at    TRIGGER     �   CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE ON public.order_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 B   DROP TRIGGER update_order_items_updated_at ON public.order_items;
       public          postgres    false    226    225                       2620    16674    orders update_orders_updated_at    TRIGGER     �   CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 8   DROP TRIGGER update_orders_updated_at ON public.orders;
       public          postgres    false    223    226                       2606    16557    cart cart_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_product_id_fkey;
       public          postgres    false    3339    221    219                       2606    16663 %   order_items order_items_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public          postgres    false    225    223    3343                       2606    16668 '   order_items order_items_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_product_id_fkey;
       public          postgres    false    3339    219    225                       2606    16543 "   products products_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.products DROP CONSTRAINT products_category_id_fkey;
       public          postgres    false    219    3337    217            �      x������ � �      �   \   x�3�-HI,IMQp�IM.)���L.��%����J�����̂���<N##S]#]CCc+#+SS=SCq++=#CK�=... �nk      �   _   x����	�0��s3�4$/Mi:���a�DEDr|��G����� �,���.����x�;1���%̖����9OTb�;�����D���2m      �   O   x�u�1�  �^�H ��8�i���j����P�1(:��:�u��Za-��dI�T�6���)�Ӝ���$D� ��%      �   �   x���An�0е9E.; ��n��z�l�75�|��Ĝ�Q%��R�#��i$���F�7��ۻv;���6�-f�n�9;�Y;�C�bj�h���ꅍ9����k׈8 �V,����Jq��o����)��	�b\�pt��&S�KJ��Srv�l	h�Dg��N���xH����m���\�'fG����$~�GẂgY�K��o      �   j  x�u�Io�0 �3�=����qNCSiJÒ.��Fv��0d)
����C5�XO�`}��%�\p����P�3�	B�0r�2PtV�{�+���`��9��^;���-ַޢ^p��/�������_-����ۙa�g�>̗���6��y��y��3 1@�q�	J[br��2H��X J3(P�g��4!�D9_��5�s�d�auL�e��)���~O#��M�$^��������t4��k�=�f�w�s���`˳	��zK�pHR� M8��
��J��	��2�sD��j����E��6�l��f,�9<+�<�tٛ������]7������pc[@~����݀��2@�@@��5K�s����/��'o���j2�G�hłx�D�x`7�q]��eVwf�t�{������}���ڈ�k��$"	�h!9��A� ��T���2��m�����ڨ��n�����鴻m�O�K�!�P�:�Yh���8�o>�Q�e�eĦR\�-�j�� L�_�p ��Eh�Au�1�ĵ*�\]\�!��~��t6��fw���14Η�����ة*ֵ�b����Pl��hy����@�+��Ӷ,�Z)/     